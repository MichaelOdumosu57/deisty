    if(GM_getValue("industry_time") == ".5"    ){
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
            var deisty_pillow = GM_getValue("pharma_pillow_GM")
            var deisty_user_pharse = "USER: I want the history of any bed at 10:30 AM on  11:00 AM was it sucessful at 9:55 AM and 9:30 AM up to 1 year from sleepmattress" // the user phrase deisty has to interpret
            var deisty_sites = [] // array of sites if thats what user want
            if(GM_getValue("deisty_sites") != undefined){ 
                deisty_sites  = GM_getValue("deisty_sites")
            }               
            var deisty_sites_description = [] // values contining informaation about where deisty is in evaluating the script
            if(GM_getValue("deisty_sites_description") != undefined){ 
                deisty_sites_description  = GM_getValue("deisty_sites_description")
            }               
            var deisty_site_url_counter;  //the amount of diffenet webistes, with this number as refence, if the deisty_sites_description[index].at_coorect_sjte equals false while looking, deisty will make sure to navigate to the proper site
            if(GM_getValue("deisty_site_url_counter") == undefined){ 
                GM_setValue("deisty_site_url_counter",0)
                deisty_site_url_counter  = 0 
            }   
            else{
                deisty_site_url_counter  = GM_getValue("deisty_site_url_counter") 
            }            
            var deisty_counter = 0 // how many times deisty has to loop on a website to make it http compliant
            
            // deisty correct format site handler
            var deisty_current_site
            var deisty_sites_description_holder // when i am modifying the deisty site descirpion, this is a holder because I can noot directly modify the value in GM
          
            //determining time zone
            var deisty_time_format = [new RegExp(/(|\d)\d:\d\d +?(A|P)M/gi)]
            var deisty_time_match_at = [new RegExp(/(on|at) +?(|\d)\d:\d\d +?(A|P)M(( +?(and|on)( +?|)(| +?|at|on)? +?(|\d)\d:\d\d +?(A|P)M)+)?/gi)] // what time  im looking at
            var deisty_time_match_at_result = []
            var deisty_time_match_sucessful = [new RegExp(/suces(sful) +?(on|at) +?(|\d)\d:\d\d +?(A|P)M(( +?(and|on)( +?|)(| +?|at|on)? +?(|\d)\d:\d\d +?(A|P)M)+)?/gi)] // was it good at that time
            var deisty_time_match_sucessful_result = []
            var deisty_time_match_at_counter //deisty_iii handles the start points for the times
                //deisty time sucessful
                var deisty_time_match_sucessful_counter //deisty_ii handles the time events where deisty needs to se if the were sucessful if occupied at that point
          
            // for what days 
            var deisty_history_available = [new RegExp(/ +?up +?to +?/)]  // this tells up how long ago  we should be looking if not availble throw and error 
            var deisty_history_format = [new RegExp(/ +?up +?to +?\d+ +?(years?|months?|weeks?|days?|infinity|as far back +?((as) +?(you) +?(can))?)/i)] // help deisty understand how far back we need to go
            var deisty_time_rate // time time zone the user is requesting
            var deisty_time_number// the number of the rate        

            // getting to the right page
            var deisty_window_location_href = window.location.href // deals with a bug in this section hopefully
                // site movement 
                var deisty_dynamic 
                if(GM_getValue("deisty_dynamic") == undefined){ 
                    GM_setValue("deisty_dynamic",false)
                    deisty_dynamic  = false 
                }   
                else{
                    deisty_dynamic  = GM_getValue("deisty_dynamic") 
                }
            // tells us that the script is in an active phase and any activities related to the understanding of the user query should be silenced 
            var deisty_requirements
            if(GM_getValue("deisty_requirements") != undefined){ 
                deisty_requirements  = GM_getValue("deisty_requirements")
            }   
            // what data is deisty ultimately reuqired to collect or what deisty is supposed to do for each specific relative site firm deisty sites in its index 
            // deisty dynamaic must be set to true here, the declaration cannot come from here if the  flag is false
           
                //DEISTY SITE SEARCHER !!!!
                var deisty_tags = [] // huge array, dealing with subparrents tags, helping deisty find the website part needed to access and retireve data      
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



              function deisty_SITE_SEARCHER(){
                   //the most powerful function in this program, this function seraches a webpage through it tags and find the answers where it can locate the data
                   // actions are taken here if the script needs to get closer to achieveing its goal
                   // after it sees a pattern its logs how it gets there, 
                   // and if the pattern falls off it requests the intital handler to search the proper path to the data again
                   console.group("%cDEISTY SITE SEARCHER !!!!","color:yellow; background-color:red; font:bold; font-size : 2em")
                       console.deisty("If you CPU gets crushed your problem is most likely here")
                       for (var deisty_iiii in document.querySelectorAll("body > *")){
                            console.log()
                       }
                   console.groupEnd()


              }              
          
          // understanding user query
          if(!deisty_dynamic){
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
                      var deisty_site_i_at_correct_site_keyword = deisty_user_pharse.split("from")[1].split(" ").join("") // this code block will change as more websites are to be considered 




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
                                                            "looking":false,
                                                            "at_correct_site_keyword":deisty_site_i_at_correct_site_keyword
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
                            deisty_sites_description[deisty_i].looking = false
                            deisty_sites_description[deisty_i].at_correct_site = true
                            console.log(deisty_sites_description[deisty_i])
                            deisty_sites_description_holder = GM_getValue("deisty_sites_description")
                            deisty_sites_description_holder[deisty_i] = deisty_sites_description[deisty_i]
                            GM_setValue("deisty_sites_description",deisty_sites_description_holder)
                            console.log(GM_getValue("deisty_sites_description"))
                        }
                        else{
                            // you should try to do everything till after deisty has all the needed infromation from the user string , log this instead
                            deisty_sites_description[deisty_i].at_correct_site = false
                            deisty_sites_description_holder = GM_getValue("deisty_sites_description")
                            deisty_sites_description_holder[deisty_i] = deisty_sites_description[deisty_i]
                            GM_setValue("deisty_sites_description",deisty_sites_description_holder)
                            console.log(GM_getValue("deisty_sites_description"))                            

                        }
                    if(window.location.href.indexOf(deisty_current_site) != -1){
                        // console.deisty(alert("so this is the site I am looking at",window.location.href))
                        console.deisty(("so this is the site I am looking at",window.location.href))
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
                  try{
                      if(deisty_user_pharse.match(deisty_time_match_at[0]).index != -1  ){
                            console.log(deisty_user_pharse.match(deisty_time_match_at[0])[0])
                            deisty_time_match_at_result.push(deisty_user_pharse.match(deisty_time_match_at[0])[0])
                            console.log("deisty_time_match_at_result", deisty_time_match_at_result) 
                            if(deisty_user_pharse.match(deisty_time_match_sucessful[0]).index != -1  ){
                                console.group("deisty time sucessful")
                                console.log(deisty_user_pharse.match(deisty_time_match_sucessful[0]))
                                deisty_time_match_sucessful_result.push(deisty_user_pharse.match(deisty_time_match_sucessful[0])[0])
                                console.log("deisty_time_match_sucessful_result",deisty_time_match_sucessful_result)
                                for(var deisty_ii in deisty_time_match_sucessful_result){
                                    // deisty_ii handles the time events where deisty needs to se if the were sucessful if occupied at that point
                                    deisty_time_match_sucessful_counter = deisty_time_match_sucessful_result[deisty_ii]
                                    console.log(deisty_time_match_sucessful_counter.match(deisty_time_format[0])) 
                                    deisty_time_match_sucessful_counter = deisty_time_match_sucessful_counter.match(deisty_time_format[0])
                                    deisty_time_match_sucessful_result[deisty_ii] = deisty_time_match_sucessful_counter
                                }
                                console.deisty("so was it good or bad to consider from these times is your question")
                                console.log(deisty_time_match_sucessful_result)
                                console.log(deisty_time_match_sucessful_result[deisty_ii])
                                console.groupEnd()
                                console.deisty("Seems like there is no other factors to be set concerning time so I am group to tokenize these start points")
                                for(var deisty_iii in deisty_time_match_at_result){
                                    // deisty_iii handles the start points for the times
                                    deisty_time_match_at_counter = deisty_time_match_at_result[deisty_iii]
                                    console.log(deisty_time_match_at_counter.match(deisty_time_format[0]))
                                    deisty_time_match_at_result[deisty_iii] = deisty_time_match_at_counter.match(deisty_time_format[0])
                                }
                                console.deisty("so I am seeing if these values were higher then the sucessful values I understand")
                                console.log(deisty_time_match_at_result)
                                console.group("for what days")
                                if(deisty_user_pharse.match(deisty_history_available[0])[0] != null){
                                    console.log(deisty_user_pharse.match(deisty_history_format[0]))
                                    console.log(deisty_user_pharse)
                                    console.log(deisty_history_format[0])
                                    console.log(deisty_user_pharse.match(deisty_history_format[0])[0])
                                    console.log(deisty_user_pharse.match(deisty_history_format[0])[1])
                                    deisty_time_rate = deisty_user_pharse.match(deisty_history_format[0])[1]
                                    deisty_time_number =  deisty_user_pharse.match(deisty_history_format[0])[0].match(/\d+/)[0]
                                    console.log(deisty_time_number)
                                    
                                    
                                    if(deisty_time_rate.match(/years?/i)){ 
                                          console.log("year")
                                          deisty_time_number = parseInt(deisty_time_number) * 365 
                                      }
                                    if(deisty_time_rate.match(/months?/i)){
                                          console.log("month")
                                          deisty_time_number = parseInt(deisty_time_number) * 30
                                      }
                                    if(deisty_time_rate.match(/weeks?/i)){
                                          console.log("weeks")
                                          deisty_time_number = parseInt(deisty_time_number) * 7
                                      }
                                    if(deisty_time_rate.match(/days?/i)){
                                          console.log("days")
                                          deisty_time_number = parseInt(deisty_time_number) * 1
                                      }          
                                    if(deisty_time_rate.match(/as|infinity/i)){
                                      console.log("infinity")
                                      deisty_time_rate = "infinity"
                                      }

                                    console.deisty("This is how far I am going back then huh \n" +  deisty_time_number)
                                    console.deisty("Anything specific?")

                                    
                                    if(deisty_user_pharse.match(/especi|specific(ally)?/)){

                                      // response code here
                                    }
                                    else{

                                        console.group((" DEISTY: ok these are my time values saving to GM"))
                                        console.log("how many days" ,deisty_time_number)
                                        console.log("future point" , deisty_time_match_at_result)
                                        console.log("past point" , deisty_time_match_sucessful_result)

                                        deisty_requirements = []
                                        deisty_requirements.push( {
                                                        "how many days" :deisty_time_number,
                                                        "future point" : deisty_time_match_at_result,
                                                        "past point" : deisty_time_match_sucessful_result
                                                      })
                                        // nothing should be set to GM until deisty understand everything it needs from the site, different from GM
                                        // logging of the site theirselves 
                                        GM_setValue("deisty_requirements",deisty_requirements)                                                      
                                        console.groupEnd()                                          
                                    }



                               
                                    
                                }
                                console.groupEnd()
                            } 
                      }
                  }
                  catch(e){
                      console.log(e)
                      console.error("error, I dont understanding what the user wants concerning time ")
                      console.deisty("I am a mean program so this is how I want things done")
                      throw("USER: I want the history of any bed at [as many times in hh:mm (12) hr format, also include and between things!]   was it sucessful at [as many times in hh:mm (12) hr format, also include and between things!] up to [how far you want me to go back in days ] from [one website]")
                  }                  
                  console.groupEnd()
              }

              if(deisty_user_pharse.match("bed").index != -1){
                      console.group("beds ")
                      console.deisty("so you are interested in beds ill pull up the list")
                      deisty_pillow = GM_getValue("pharma_pillow_GM")     // pillow we have to work with
                      if(deisty_user_pharse.match("any +?bed") != null){

                        // response code here
                      }
                      else{
                        console.deisty("so you want all the pillow that my partner has ok")
                      }
                      console.deisty_data( deisty_pillow)

                      console.groupEnd()
              }

          }
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy





          // deisty dynamic_href

          // changes required at end of coding
          // GM_setValue("deisty_sites_description",deisty_sites_description)

          console.group("getting to the right page")
              console.deisty("so this is what I am supposed to do ")
              console.info(deisty_requirements)
              console.deisty("first lets activate dynamic mode ")
              console.group("site movement")
                  console.group("GM_change: deisty_dynamic")
                      deisty_dynamic = true
                      GM_setValue("deisty_dynamic",deisty_dynamic)
                      console.log(deisty_dynamic)
                      console.log(GM_getValue("deisty_dynamic"))
                  console.groupEnd()  
                  console.deisty("am I at the right site")
                  console.log(deisty_sites[deisty_site_url_counter])
                  console.log(deisty_sites_description[deisty_site_url_counter].at_correct_site)
                  if(deisty_sites_description[deisty_site_url_counter].at_correct_site == false  || deisty_window_location_href.indexOf(deisty_sites_description[deisty_site_url_counter].at_correct_site_keyword) == -1  ){
                      console.group("GM_change: deisty_sites_description")
                          deisty_sites_description[deisty_site_url_counter].at_correct_site = true
                          GM_setValue("deisty_sites_description",deisty_sites_description)
                          console.log(deisty_sites_description)
                          console.log(GM_getValue("deisty_sites_description"))
                          console.log(deisty_window_location_href.indexOf(      deisty_sites_description[deisty_site_url_counter].at_correct_site_keyword                ))
                          console.log(deisty_sites_description[deisty_site_url_counter].at_correct_site_keyword)
                          console.log(deisty_window_location_href)                        
                      console.groupEnd()                                                               
                      window.location.assign(deisty_sites[deisty_site_url_counter])  
                  }
                  else{ 
                  }

              console.groupEnd()




              console.deisty("so now how do I search on this site, is there a search bar where I can enter beds")

              deisty_SITE_SEARCHER()
              

          console.groupEnd()    
          //  be very careful any assignment from GM MUST BE REASSIGNED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
          //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy




          alpha_sleep
          

    }

