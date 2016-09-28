using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Models {
    public class UserUpdateModel {
        public string oldEmail { get; set; }
        public string newEmail { get; set; }
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
        public string newPasswordConf { get; set; }
    }
}
