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
        altEmail : {
            type : String,
            default : ""
        },
        password : {
            type : String,
            required : true,
            min : 6,
            max: 20
        },
        rollNumber : {
            type : String,
            unique: true,
            required : true
        },
        // batch : {
        //     type : Date,
        //     required :true,
        // }
        // dob : {
        //     type : Date,
        //     required : true
        // },
        address : {
            type : String,
            default : "",
            max : 150
        },
        // phoneNo : {
        //     type : Number,
        //     required: true,
        // },
        altPhoneNo : {
            type : Number,
            default : null
        },
        title : {
            type : String,
        },
        location : {
            type : String,
        },
        skills : [{
            type: String,
        }],
        about : {
            type : String,
        },
        experience : [{
            company : {
                type : String,
            },
            position : {
                type : String,
            },
            startDate : {
                type : Date,
            },
            endDate : {
                type : Date,
            }
        }],
        education : [{
            institution : {
                type : String,
            },
            degree : {
                type : String,
            },
            startDate : {
                type : Date,
            },
            endDate : {
                type : Date,
            }
        }],
        socialHandles : [{
            socialmedianame : {
                type : String,
            }, 
            profilelink : {
                type : String,
            }
        }], 
        achievements : [{
            type : String,
        }]
    },
    {timestamps : true}
)

module.exports = mongoose.model('Alumni', AlumiSchema);
