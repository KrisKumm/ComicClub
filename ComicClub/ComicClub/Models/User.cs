using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using MongoDB.Driver.Builders;
using MongoDB.Bson.Serialization.Attributes;

namespace ComicClub.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        public ObjectId Id { get; set; }
        public string nickname { get; set; }
        public string password { get; set; }
        public string picture { get; set; }
        public List<ObjectId> comicIdList { get; set; }

        public User()
        {
            comicIdList = new List<ObjectId>();
        }
    }
}