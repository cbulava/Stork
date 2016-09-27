using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace StorkServer.Models {
    public class logoutModel {
        public int id { get; set; }

        public logoutModel() {
            id = -1;
        }
    }
}
