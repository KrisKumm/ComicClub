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
    public class Comic
    {
        public ObjectId Id { get; set; }
        public int numberLikes { get; set; }
        public string name { get; set; }
        public List<string> pagesList { get; set; }

        public Comic()
        {
            pagesList = new List<string>();
        }
    }
}