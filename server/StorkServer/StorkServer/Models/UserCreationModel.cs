using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Models {
    public class UserCreationModel {
        public string email { get; set; }
        public string password { get; set; }
        public string passwordConf { get; set; }
    }
}
