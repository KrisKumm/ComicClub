using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using MongoDB.Driver.Builders;

namespace ComicClub.Models
{
    public class Comment
    {
        public ObjectId Id { get; set; }
        public string idUserComm { get; set; }
        public string idComicComm { get; set; }
        public string commentText { get; set; }

        public Comment()
        {

        }
    }
}