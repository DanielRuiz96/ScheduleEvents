from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routers.user import router
from routers.event import router_event
from config import SECRETKEY,HOSTPATH,FRONTENDPORT,BACKENDPORT,HOST


app = Flask(__name__)

# Configura CORS
cors = CORS(app, resources={r"/user/*": {"origins": f"http://{HOSTPATH}:{FRONTENDPORT}"},r"/event/*": {"origins": f"http://{HOSTPATH}:{FRONTENDPORT}"},r"/*": {"origins": f"http://{HOSTPATH}:{FRONTENDPORT}"}})

app.config['JWT_SECRET_KEY'] = SECRETKEY

jwt = JWTManager(app)

app.register_blueprint(router, url_prefix='/user')
app.register_blueprint(router_event, url_prefix='/event')

if __name__ == '__main__':
    app.run(port=BACKENDPORT,host=HOST,debug= True)



