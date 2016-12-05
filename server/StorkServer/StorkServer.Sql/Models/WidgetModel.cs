using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Sql.Models {
    public class WidgetModel {
        public long id { get; set; }
        public long widgetType { get; set; }
        public long refresh { get; set; }
        public long x { get; set; }
        public long y { get; set; }
        public long width { get; set; }
        public long height { get; set; }
        //the internal representation
        private LinkedList<string> stocks { get; }
        private LinkedList<string> stockFieldArray { get; }
        //the external view
        public string[] stockList {
            get { return stocks.ToArray(); }
            set { stocks.Clear(); for (int i = 0; i < value.Length; i++) {
                    stocks.AddLast(value[i]);
                }
            }
        }
        public string[] stockFields {
            get { return stockFieldArray.ToArray(); }
            set { stockFieldArray.Clear(); for (int i = 0; i < value.Length; i++) {
                    stockFieldArray.AddLast(value[i]);
                }
            }
        }
        
        public WidgetModel() {
            stocks = new LinkedList<string>();
            stockFieldArray = new LinkedList<string>();
        }

        //Very basic implementation, may need huge change
        public void addStock(string s) {
            stocks.AddLast(s);
        }
        //very basic implementation, may need huge change
        public void removeStock(string s) {
            stocks.Remove(s);
        }

        public void addStockField(string s) {
            stockFieldArray.AddLast(s);
        }

        public void removeStockField(string s) {
            stockFieldArray.Remove(s);
        }
    }
}
