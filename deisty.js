  // ==UserScript==
  // @name         data query
  // @namespace    http://tampermonkey.net/
  // @version      0.1
  // @description  try to take over the world!
  // @author       You
  // @match        https://sleepmattress.com/*
  // @match        https://www.alpha_sleep.com/*
  // @grant        GM_setValue
  // @grant        GM_getValue
  // @grant        GM_deleteValue
  // @grant        GM_listValues
  // ==/UserScript==

  (function() {
      'use strict';


  console.deisty = function(a){
    console.log("DEISTY:%c " + a,"background:#00FF7F")
  }

  console.deisty_data =  function(a){
    console.warn("INFO: ",a)
  }

  console.deisty_dev = function(a){
    console.warn("DEV:%c",a, "background: #D8BFD8")
  }

          // data
          {
            var deisty_site_check = true // checks if we are at the right site
            var deisty_pillow
            var deisty_user_pharse = "USER: I want the history of any bed at 10:30 AM from sleepmattress" // the user phrase deisty has to interpret
            var deisty_sites = [] // array of sites if thats what user wants
            var deisty_sites_description = [] // values contining informaation about where deisty is in evaluating the script
            var deisty_counter = 0 // how many times deisty has to loop on a website to make it http compliant
            
            // deisty correct format site handler
            var deisty_current_site
            var deisty_sites_description_holder // when i am modifying the deisty site descirpion, this is a holder because I can noot directly modify the value in GM
          }

          // functions
          
              function deisty_http_tokenization(deisty_a){
                  
                  console.group("deisty_http_tokenization")
                  console.deisty_data(deisty_a)
                  if(deisty_a.match(/.https?\b/g) != null){
                      console.deisty("to the front ")
                      deisty_a = deisty_a.split(".")[1] + "." + deisty_a.split(".")[0].split(" ").join("")
                      console.deisty_data(deisty_a)
                  }

                  else{

                      deisty_a = "https://www." + deisty_a.split(" ").join("")
                      console.deisty_data(deisty_a)
                  }

                  console.deisty_data(deisty_a.match(/\b.com?/g))
                  if(deisty_a.match(/\b.com?/g) != null){
                      console.deisty_data(deisty_a,"has the com in the wrong place ")
                  }

                  else{
                    deisty_a = deisty_a + ".com"
                    console.deisty_data(deisty_a)
                  }
                  console.groupEnd();

                  return deisty_a
              }
              // turns human user requested sites to http format
              // this function should handle one site at a time with flags for complex variations
          
          // requests regex handler
          {
              console.log(deisty_user_pharse)

              //
              console.deisty(" first from which site hmm")

              if(deisty_user_pharse.match("from").index != -1){
                console.deisty("so you are interested in this site huh ok ")
                console.deisty_data(deisty_user_pharse.split("from")[1])




                  // site check lists
                  if(deisty_user_pharse.split("from")[1] != undefined){
                      console.deisty("there are several cases here but I will assme there is only one site ")
                      var deisty_site_i = deisty_user_pharse.split("from")[1]  // to see if the url parameters are set




                      while(deisty_site_i.match(/.https?:\b/g) == null && deisty_site_i.match(/\b.com?/g) == null && deisty_counter != 10){
                          
                      


                              console.deisty("i need to tokenize this site ")
                              deisty_site_i = deisty_http_tokenization(deisty_site_i)
                              console.deisty_data(deisty_site_i,deisty_counter)
                              deisty_counter += 1

                      }
                      if(deisty_counter == 10){
                          console.deisty("this was supposed to be fixed by now ")
                          throw(console.deisty_dev("fix: deisty_http_tokenization"))
                      }
                      else{
                          deisty_sites.push(deisty_site_i)
                          deisty_sites_description.push({
                                                            "looking":false
                              
                              
                              
                                                                    })
                          console.deisty("the sites I have so far")
                          console.deisty_data(deisty_sites)

                      }
                      



                  }
                  else{
                        console.group("missing sites for deisty")

                        if(GM_getValue("deisty_sites") != null){
                            deisty_sites = GM_getValue("deisty_sites")
                        }
                        else{
                            throw(console.deisty("Well how am I gunna grab data if I don't know what site I am going to go to"))
                        }
                        console.groupEnd()
                        
                  }
                  GM_getValue("deisty_sites") != deisty_sites ?  GM_setValue("deisty_sites",deisty_sites)  :null
                  GM_getValue("deisty_sites_description") == null ?  GM_setValue("deisty_sites_description",deisty_sites_description)  :null
                  for (var deisty_i in deisty_sites){
                    //   deisty_i handles indiviual sites in deisty sites
                    console.group("deisty correct format site handler")
                    // console.deisty("these urls can be weired sometimes they are missing www, or other stuff hopefully I properlly break this down, its either I catch them or you do ")
                    deisty_current_site = deisty_sites[deisty_i].split(".")[1]
                    console.log(deisty_current_site)
                    console.log(deisty_sites[deisty_i])
                        if(window.location.href.indexOf(deisty_current_site) != -1){
                            console.deisty("ok so we are on the same website I assume that deisty_sites gave me the corret website format ")
                            
                            console.log(GM_getValue("deisty_sites_description"))
                            deisty_sites_description[deisty_i].looking = true
                            console.log(deisty_sites_description[deisty_i])
                            deisty_sites_description_holder = GM_getValue("deisty_sites_description")
                            deisty_sites_description_holder[deisty_i] = deisty_sites_description[deisty_i]
                            GM_setValue("deisty_sites_description",deisty_sites_description_holder)
                            console.log(GM_getValue("deisty_sites_description"))
                        }
                        else{
                            window.location.assign(deisty_sites[deisty_i])
                        }
                    if(window.location.href.indexOf(deisty_current_site) != -1){
                        // console.deisty(alert("so this is the site I am looking at",window.location.href))
                        consle.deisty(("so this is the site I am looking at",window.location.href))
                    }
                    console.groupEnd()
                      
                  }
                  
                  
                  
                  
                  // buffer to handle multiple sites
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



                
              }
              

              if(deisty_user_pharse.match("history").index != -1  ){
                  console.group("determining time zone")
                  console.deisty("so you are interested in the history of something ")
                  console.deisty("how far back?")
                  if(deisty_user_pharse.match(/\d?\d:\d\d +?(A|P)M/i).index != -1  ){
                        console.deisty("from that time huh")
                        console.deisty(deisty_user_pharse.match(/\d?\d:\d\d +?(A|P)M/i))
                        console.deisty_data(deisty_user_pharse.match(/\d?\d:\d\d +?(A|P)M/i))
                  }
                  console.groupEnd()
              }
              if(deisty_user_pharse.match("bed").index != -1){
                      console.deisty("so you are interested in beds ill pull up the list")
                      deisty_pillow = GM_getValue("pharma_pillow_GM")     // pillow we have to work with
                      console.deisty_data( deisty_pillow)
              }

          }
          // this section handles the desires understanding of the user




          

  })();