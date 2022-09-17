using System.Reflection;
using FA22.P05.Tests.Web.Helpers;
using FA22.P05.Web;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using InitialMigration = FA22.P05.Web.Migrations.Initial;

namespace FA22.P05.Tests.Web
{
    [TestClass]
    public class DataContextTests
    {
        private WebTestContext context = new();

        [TestInitialize]
        public void Init()
        {
            context = new WebTestContext();
        }

        [TestCleanup]
        public void Cleanup()
        {
            context.Dispose();
        }

        [TestMethod]
        public void InitialMigration_NotDeletedOrChanged()
        {
            var attribute = typeof(InitialMigration).GetCustomAttribute<MigrationAttribute>();
            attribute.Should().NotBeNull();
            attribute?.Id.Should().Be("20220830184634_Initial", "Please don't delete the initial migrations");
        }

        [TestMethod]
        public void DataContext_IsOneDeclared()
        {
            var type = typeof(Program).Assembly.GetTypes().Where(x => x.IsSubclassOf(typeof(DbContext))).ToList();
            Assert.IsTrue(type.Count > 0, "You don't have a DbContext declared yet");
            Assert.IsFalse(type.Count > 1, "You have more than one data context created");
            Assert.IsTrue(type[0].Name == "DataContext", "You need to call your DbContext class 'DataContext' not " + type[0].Name);
        }

        [TestMethod]
        public void DataContext_RegisteredInServices()
        {
            var type = typeof(Program).Assembly.GetTypes().FirstOrDefault(x => x.IsSubclassOf(typeof(DbContext)));
            if (type == null)
            {
                Assert.Fail("Not ready for this test");
                return;
            }

            using var scope = context.GetServices().CreateScope();
            var dbContext = GetDataContext(scope);

            Assert.IsNotNull(dbContext, "You need to register your DB context");
        }

        private static DbContext? GetDataContext(IServiceScope scope)
        {
            try
            {
                var type = typeof(Program).Assembly.GetTypes().Single(x => x.IsSubclassOf(typeof(DbContext)));
                var dataContext = (DbContext)scope.ServiceProvider.GetService(type)!;
                return dataContext;
            }
            catch
            {
                return null;
            }
        }
    }
}
