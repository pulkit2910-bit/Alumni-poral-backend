const mongoose = require('mongoose');

const AlumiSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
            min: 4,
            max: 20
        },
        avatar: {
            public_id: {
              type: String,
            },
            url: {
              type: String,
              default: "https://res.cloudinary.com/dcz9grvnh/image/upload/v1678971457/profile-unfilled_mseeo9.png"
            }
        },
        email : {
            type : String,
            required : true,
            unique: true,
            max: 50
        },
        password : {
            type : String,
            required : true,
            min : 6,
            max: 20
        },
        connections : {
            type : Array,
            default : []
        },
        rollNumber : {
            type : String,
            unique: true,
            required : true
        },
        // dob : {
        //     type : Date,
        //     required : true
        // },
        address : {
            type : String,
            default : "",
            max : 150
        },
        // countryCode : {
        //     type : String,
        //     required: true,
        // },
        // phoneNumber : {
        //     type : String,
        //     required: true,
        // },
        socialMediaLinks : {
            linkedin : {
                type : String,
                default : ""
            },
            instagram : {
                type: String,
                default : ""
            },
            github : {
                type : String,
                default : ""
            }
        },
    },
    {timestamps : true}
)

module.exports = mongoose.model('Alumni', AlumiSchema);
