from marshmallow import Schema, fields, validates,ValidationError

class UserSchema(Schema):
    id = fields.Int(required= False)
    username = fields.String(required= True)
    email = fields.Email(required= True)
    password = fields.String(required= True)
    
class ChangePasswordSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)
    newpassword = fields.String(required=True)

class EventSchema(Schema):
    id = fields.Int(required= False)
    name = fields.String(required= True)
    date = fields.DateTime(required=True, format="%d %B %Y %H:%M:%S")
    place = fields.String(required= True)
    modality = fields.String(required= True)
    user_id = fields.Int(required= False)
    

    @validates("modality")
    def validate_modality(self, value):
        if value not in ["PRESENTIAL", "VIRTUAL"]:
            raise ValidationError("Invalid modality")

