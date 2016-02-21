/*
********************         SCRIPT HEADER         **************************
*
*AUTHOR: Bush, Michael D
*DATE:   20 FEB 2016
*TITLE:  Backend.js
*PURPOSE:
*        The purpose of this script is to provide database interaction for 
*        the user interface provided in the accompanying HTML files.  This
*        script manages all read and write functions to the database by
*        providing the developer with safe *cough* *cough* functions that 
*        are intuitively named.  
*
*REVISION HISTORY:
*        NONE
*
*KNOWN BUGS:
*        RIGHT...
*
********************          METHOD LIST          **************************
* db
*    BusinessLoc     --- Business location management functions
*          PublishToDatabase --- Add a new location to a particular business
*          Retrieve          --- Retrieve Business location data by ID
*          Update            --- Update a Business location by ID
*          RetrieveID        --- Retrieve a Business location ID
*
*    PersonalInfo     --- Customer profile management functions
*          PublishToDatabase --- Add a new profile
*          Retrieve          --- Retrieve Customer Profile data by ID
*          Update            --- Update a Customer Profile by ID
*          RetrieveID        --- Retrieve a Customer Profile ID
*
*    BusinessInfo     --- Business profile management functions
*          PublishToDatabase --- Add a new profile
*          Retrieve          --- Retrieve Business Profile data by ID
*          Update            --- Update a Business Profile by ID
*          RetrieveID        --- Retrieve a Business Profile ID
*          RetrieveStumble   --- Get a random Business Profile ID for stumble feature
*
*    PersonalInfo     --- Customer profile management functions
*          PublishToDatabase --- Add a new profile
*          Retrieve          --- Retrieve Customer Profile data by ID
*          Update            --- Update a Customer Profile by ID
*          RetrieveID        --- Retrieve a Customer Profile ID
*
*    Message     --- Message management functions
*          Send              --- Add message to recipient's inbox and sender's outbox
*          Open              --- Get message text for recipient to read
*
*    Favorites     --- Customer favorites management functions
*          SetUserID         --- Set default User ID so you don't have to pass it over and over
*          Add               --- Add a Business ID to Customer's favorites
*          Remove            --- Remove a Business ID from Customer's favorites
*
*    Notifications     --- Notification management functions
*          SendNotification  --- Add a new notification to User's notification queue
*
*/

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

"use strict";

const USERID = 0
const BUSID = 1

var dbData =  { Messages            : {},
                Businesses          : {},
                BusinessLocations   : {},
                CustomerUsers       : {},
                Favorites           : {},
                Inbox               : {},
                Outbox              : {},
                Notifications       : {},
                NotificationData    : {} };

var db = db || {};

alert( "What Am I Doing".hashCode() )

db.BusinessLoc = {
                    PublishToDatabase: function(Name, GPSLocation,BusinessHours, StreetAddress, DoDelivery, DoPickupTakeout, DoInStore, Rating, BusinessID )
                    {
                       
                       var ID = toString(StreetAddress.hashCode() )
                       
                       dbData.BusinessLocations[ID] = { Name : Name, GPSLocation : GPSLocation, BusinessHours : BusinessHours,
                                                    StreetAddress : StreetAddress, DoDelivery : DoDelivery, DoPickupTakeout : DoPickupTakeout,
                                                    DoInStore : DoInStore, Rating : Rating, BusinessID : BusinessID};
                       
                       return ID;
                        
                    },
                    Retrieve: function(ID)
                    {
                        if (ID == "")
                        {
                            throw "No User ID specified"
                        }
                        try {
                        var Info = {};
                        
                        Info.Name = dbData.BusinessLocations[ID].Name;
                        Info.GPSLocation = dbData.BusinessLocations[ID].GPSLocation;
                        Info.BusinessHours = dbData.BusinessLocations[ID].BusinessHours;
                        Info.StreetAddress = dbData.BusinessLocations[ID].StreetAddress;
                        Info.DoDelivery = dbData.BusinessLocations[ID].DoDelivery;
                        Info.DoPickupTakeout = dbData.BusinessLocations[ID].DoPickupTakeout;
                        Info.DoInStore = dbData.BusinessLocations[ID].DoInStore;
                        Info.Rating = dbData.BusinessLocations[ID].Rating
                        Info.BusinessID = dbData.BusinessLocations[ID].BusinessID
                        Info.ID = ID;
                        
                        return Info;
                        }
                        catch(err)
                        {
                            throw "Invalid User ID"
                            console.log(err)
                        }
                    },
                    Update: function(Name, GPSLocation,BusinessHours, StreetAddress, DoDelivery, DoPickupTakeout, DoInStore, Rating, ID)
                    {
                        dbData.BusinessLocations[ID] = { Name : Name, GPSLocation : GPSLocation, BusinessHours : BusinessHours,
                                                    StreetAddress : StreetAddress, DoDelivery : DoDelivery, DoPickupTakeout : DoPickupTakeout,
                                                    DoInStore : DoInStore, Rating : Rating};
                    },
                    RetrieveID: function(StreetAddress)
                    {
                        return toString(StreetAddress.hashCode())
                    }
                    
                 }
                 
db.PersonalInfo = {
                    
                    __ID : "", 
                    
                    PublishToDatabase: function(Name, Email, Password, MakePublic)
                    { 
                        
                        var MakePub =  MakePublic != undefined ? MakePublic : false;
                       
                       var ID = toString( Email.hashCode() )
                       
                       dbData.CustomerUsers[ID] = { Name : Name, Email : Email, Password : Password, MakePublic : MakePub }
                       
                       return ID;
                    },
                    
                    Retrieve: function(ID)
                    {
                        var Info = {};
                        Info.Name = dbData.CustomerUsers[ID].Name;
                        Info.Email = dbData.CustomerUsers[ID].Email;
                        Info.Password = dbData.CustomerUsers[ID].Password;
                        Info.MakePublic = dbData.CustomerUsers[ID].MakePublic
                        Info.ID = ID;
                        return Info;
                    },
                    
                    Update: function (Name, Email, Password, MakePublic, ID)
                    {
                       dbData.CustomerUsers[ID] = { Name : Name, Email : Email, Password : Password, MakePublic : MakePub }                        
                    },
                    
                    RetrieveID: function ( Email )
                    {
                        return toString(Email.hashCode())
                    }
                  }

db.BusinessInfo = {
                    PublishToDatabase: function(Name, HeadquarterAddress, SupportPhone, MainEmail, About, Auth, MakePublic)
                    {
                        
                        var MakePub =  MakePublic != undefined ? MakePublic : true;
                        
                        var ID = toString(Name.hashCode());
                        
                        dbData.Businesses[ID] = { Name : Name, HeadquarterAddress : HeadquarterAddress, SupportPhone : SupportPhone, 
                                                             MainEmail : MainEmail, About : About, Auth : Auth, MakePublic : MakePub
                                                            };
                        
                        return ID;
                        
                    },
                    Retrieve: function(ID)
                    {
                        var Info = {};
                        Info.Name = dbData.Businesses[ID].Name;
                        Info.HeadquarterAddress = dbData.Businesses[ID].HeadquarterAddress;
                        Info.SupportPhone = dbData.Businesses[ID].SupportPhone;
                        Info.MainEmail = dbData.Businesses[ID].MainEmail;
                        Info.About = dbData.Businesses[ID].About;
                        Info.Auth = dbData.Businesses[ID].Auth;
                        Info.ID = ID;
                        return Info;
                    },
                    
                    Update: function(Name, HeadquarterAddress, SupportPhone, MainEmail, About, Auth, MakePublic, ID)
                    {
                        dbData.Businesses[ID] = { Name : Name, HeadquarterAddress : HeadquarterAddress, SupportPhone : SupportPhone, 
                                                             MainEmail : MainEmail, About : About, Auth : Auth, MakePublic : MakePub
                                                            };
                    },
                    
                    RetrieveID: function(Name)
                    {
                        return toString( Name.hashCode())
                    },
                    
                    RetrieveStumble()
                    {
                        var ID = dbData.Businesses.keys[Math.random() % dbData.Businesses.keys.length-1]
                        return this.retrieve(ID)
                    }
                    
                  }
                  
db.Message = {
                Send : function(MessageText, ToID, FromID)
                {
                    var ID = toString( (toString(ToID)+toString(FromID)).hashCode() );
                        
                        dbData.Messages[ID] = { MessageText : MessageText, To : ToID, From : FromID, Read : false};
                        dbData.Inbox[ToID][ID] = true
                        dbData.Outbox[FromID][ID] = true
                        
                        return ID;
                },
                Open : function(ID)
                {
                        var Info = {};
                        
                        dbData.Messages[ID].Read = true
                        Info.MessageText = dbData.Messages[ID].MessageText;
                        Info.ToID = dbData.Messages[ID].ToID;
                        Info.FromID = dbData.Messages[ID].FromID;
                        Info.ID = ID;
                        
                        return Info;
                }
                
             }

db.Favorites = {
                    __ID: "",
                    SetUserID: function(ID)
                    {
                        this.__ID = ID;
                    },
                    
                    Add: function(BusinessID, ID)
                    {
                        var IDuse =  ID != undefined ? ID : this.__ID;
                        
                        if (IDuse == "" )
                        {
                            console.log("No User ID specified")
                            throw "No User ID specified";
                        }
                        dbData.Favorites[IDuse][BusinessID] = true
                    },
                    
                    Remove: function( BusinessID, ID )
                    {
                        var IDuse =  ID != undefined ? ID : this.__ID;
                        
                        if (IDuse == "" )
                        {
                            console.log("No User ID specified")
                            throw "No User ID specified";
                        }
                        if (dbData.Favorites[IDuse][BusinessID] === undefined)
                        {
                            console.log(BusinessID + " is not a favorite.")
                            throw BusinessID + " is not a favorite."
                        }
                        delete dbData.Favorites[IDuse][BusinessID];
                    }
                }
                
db.Notifications = {
                        __ID : "",
                        
                        SendNotification: function (TargetID, NotificationText, TargetType)
                        {
                            var IDuse =  TargetID != undefined ? TargetID : this.__ID;
                            
                            if ( IDuse == "" )
                            {
                                console.log("No User ID specified")
                                throw "No User ID specified";
                            }
                            var msgID = ""
                            if (NotificationText.length() < 10)
                            {
                                msgID = toString( NotificationText.hashCode() )
                            }
                            else
                            {
                                msgID = toString( NotificationText.Slice(0,9) )
                            }
                            
                            dbData.Notifications[msgID] = { NotificationText : NotificationText, TargetType : TargetType}
                            dbData.NotificationData[TargetID][msgID] = true
                            return msgID
                            
                        }
                    }
             
alert( db.PersonalInfo.Retrieve([db.PersonalInfo.PublishToDatabase("Michael", "michael.bush@mines.sdmst.edu", "password")]).Name)