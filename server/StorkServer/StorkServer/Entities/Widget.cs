using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Entities
{
    public partial class Widget
    {
        [Key]
        [JsonIgnore]
        public int ID { get; set; }

        [Required]
        [StringLength(5)]
        public int col { get; set; }

        [Required]
        [StringLength(5)]
        public int row { get; set; }

        [Required]
        [StringLength(5)]
        public int sizeX { get; set; }

        [Required]
        [StringLength(5)]
        public int sizeY { get; set; }

        [Required]
        [StringLength(2)]
        public int refreshRate { get; set; }

        
        public List <string> stocklist { get; set; }

        public string widgetType { get; set; }
    }
}
