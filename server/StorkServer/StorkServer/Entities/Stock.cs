using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Entities
{
    public partial class Stock
    {
        [Key]
        [JsonIgnore]
        public int ID { get; set;}

        [Required]
        [StringLength(5)]
        public string acronym { get; set; }


    }
}
