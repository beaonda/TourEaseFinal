import { Injectable } from '@angular/core';
import Typesense from 'typesense';
/* import { InstantSearch, SearchBox, Hits, Stats } from "react-instantsearch-dom" */





@Injectable({
  providedIn: 'root'
})


export class TypesenseService {

  client = new Typesense.Client({
    'nodes': [{
      'host': 'nuts7adl3pw4y1oqp-1.a1.typesense.net',
      'port': 443,
      'protocol': 'https'
    }],
    'apiKey': '1uhOWEthA1pTJ2nyF0ghZ749eHdDp3Fu',
    'connectionTimeoutSeconds': 2
  });

  

  constructor() { }
  
 
  searchEst(query:string){
    var res;
    
    this.client.collections('tourist_spots')
      .documents()
      .search({q: query, query_by:'estName'})
      .then(function (searchResults) {
        
        res = searchResults.hits;
        console.log(res);
        
      })
      return res;
  }
  
}
