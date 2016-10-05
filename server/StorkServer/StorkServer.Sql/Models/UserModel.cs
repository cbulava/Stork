using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Sql.Models {
    public class UserModel {
        public long id { get; set; }
        public string email { get; set; }
        private LinkedList<WidgetModel> widgets;
        public WidgetModel[] widgetList {
            get { return widgets.ToArray(); }
            set {
                widgets.Clear();
                for (int i = 0; i < value.Length; i++) {
                    widgets.AddLast(value[i]);
                }
            }
        }

        public UserModel() {
            widgets = new LinkedList<WidgetModel>();
        }

        public void addWidget(WidgetModel w) {
            widgets.AddLast(w);
        }

        public void removeWidget(WidgetModel w) {
            widgets.Remove(w);
        }
    }
}
