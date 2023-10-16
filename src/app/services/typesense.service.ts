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

  
  
 
  /* searchEst(query:string){
    var res;
    var list;
    
    this.client.collections('tourist_spots')
      .documents()
      .search({q: query, query_by:'estName'})
      .then(function (searchResults) {
        
        res = searchResults.hits;
       
        list = res?.map(results => results.document);
        console.log(list);
      });
       
      return list;
  } */

  searchEst(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.collections('tourist_spots')
        .documents()
        .search({ q: query, query_by: 'estName' })
        .then((searchResults) => {
          const res = searchResults.hits;
          const list = res!.map((result) => result.document);
          console.log(list);
          resolve(list);
        })
        .catch((error) => {
          console.error('Search error:', error);
          reject(error);
        });
    });
  }
  
}

export interface SearchResult {
  document: {
    estName: string;
    city:string
    // Add other properties if they exist
  };

  // Add other properties if they exist
}

