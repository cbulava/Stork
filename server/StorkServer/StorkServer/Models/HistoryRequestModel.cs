using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Models {
    public class HistoryRequestModel {
        public String startDate { get; set; }
        public String type { get; set; }
        public String interval { get; set; }
        public String endDate { get; set; }
        public IEnumerable<String> fields { get; set; }

        HistoryRequestModel() {
            type = "daily";
            interval = "60";
        }
    }

}
