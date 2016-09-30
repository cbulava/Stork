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
        public int ID { get; set; }

        [Key]
        [Required]
        public string useremail { get; set; }

        [Key]
        [Required]
        public string username { get; set; }        


        public List<Widget> widgetlist { get; set; }
    }
}
