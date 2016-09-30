using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StorkServer.Entities;

namespace StorkServer.Sql
{
    public partial class WidgetDataModel : DbContext
    {
        public StockDataModel()
            : base("name=StockDataModel")
        {
        }
        public virtual DbSet<Stock> Stock { get; set; }

    }
}
