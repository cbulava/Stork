using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Business {
    public class ServerResponse {
        private bool success; //the success status of the operation
        private String message; //the additional message cause by success or failure
        private Object payload; //if the server also needs to return an object it should be placed in the payload

        public ServerResponse(bool success, String message, Object payload) {
            this.success = success;
            this.message = message;
            this.payload = payload;
        }

        public bool getSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }

        public Object getPayload() {
            return payload;
        }
    }
}
