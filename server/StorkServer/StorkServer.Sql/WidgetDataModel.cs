﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Sql
{
    public partial class WidgetDataModel : DbContext
    {
        public WidgetDataModel()
            : base("name=WidgetDataModel")
        {
        }
    }
}
