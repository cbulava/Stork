using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Entities
{
    public partial class User
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        
        [Required]
        public string useremail { get; set; }

        
        [Required]
        public string username { get; set; }        

        [Required]
        public string password { get; set; }


        public string widgetlist { get; set; }
    }
}
