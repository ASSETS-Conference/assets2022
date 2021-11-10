//Check current page and highlight menu selection

        var page = "";

        // Check if current_page is set
        // If not set then private browsing disabled local storage
        // Set page value manually
        if (localStorage.getItem("current_page") === null)
        {
            if (window.location.pathname.includes("index.html")) 
            {
                page = "Home";
            }

            // ---------------------- //
            // AUTHORS
            // ---------------------- //

            else if (window.location.pathname.includes("creating_accessible_pdfs.html") 
                    || window.location.pathname.includes("making_accessible_presentations.html") 
                    || window.location.pathname.includes("call_for_papers.html") 
                    || window.location.pathname.includes("call_for_mentors.html") 
                    || window.location.pathname.includes("technical_papers.html") 
                    || window.location.pathname.includes("posters_and_demos.html") 
                    || window.location.pathname.includes("doctoral_consortium.html") 
                    || window.location.pathname.includes("experience_reports.html") 
                    || window.location.pathname.includes("captioning_challenge.html") 
                    || window.location.pathname.includes("text_entry_challenge.html") 
                    || window.location.pathname.includes("student_research_competition.html")
                    || window.location.pathname.includes("submission_templates.html"))
            {
                page = "Authors"; 
            }

            // ---------------------- //
            // REGISTRATION
            // ---------------------- //

            else if (window.location.pathname.includes("registration.html")) 
            {
                page = "Registration";
            }

            // ---------------------- //
            // ATTENDING
            // ---------------------- //

            else if (window.location.pathname.includes("venue.html") 
                    || window.location.pathname.includes("attending.html") 
                    || window.location.pathname.includes("local_attractions_and_travel_tips.html") 
                    || window.location.pathname.includes("travel_award.html")) 
            {
                page = "Attending";
            }

            // ---------------------- //
            // PROGRAM
            // ---------------------- //

            else if (window.location.pathname.includes("accepted_papers.html") 
                    || window.location.pathname.includes("accepted_experience_reports.html") 
                    || window.location.pathname.includes("TACCESS_papers.html") 
                    || window.location.pathname.includes("accepted_dc_participants.html") 
                    || window.location.pathname.includes("program.html") 
                    || window.location.pathname.includes("accepted_src_papers.html") 
                    || window.location.pathname.includes("keynote_speaker.html") 
                    || window.location.pathname.includes("accepted_posters.html")
                    || window.location.pathname.includes("user_experience_panel.html"))
            {
                page = "Program";
            }

            // ---------------------- //
            // AWARDS
            // ---------------------- //

            else if (window.location.pathname.includes("awards.html"))
            {
                page = "Awards";
            }

            // ---------------------- //
            // COMMITTEES
            // ---------------------- //

            else if (window.location.pathname.includes("committees.html")
                    || window.location.pathname.includes("organizing_committee.html")
                    || window.location.pathname.includes("policy_program_committees.html")
                    || window.location.pathname.includes("program_committee.html")
                    || window.location.pathname.includes("student_volunteers.html")
                    || window.location.pathname.includes("best_papers_committee.html")) 
            {
                page = "Committees";
            }

            // ---------------------- //
            // SPONSORS
            // ---------------------- //

            else if (window.location.pathname.includes("sponsors_and_partners.html")
                    || window.location.pathname.includes("becoming_partner.html"))
            {
                page = "Sponsors";
            }

            // ACCESSIBILITY FAQ
            else if (window.location.pathname.includes("accessibility_FAQ.html")) 
            {
                page = "Accessibility";
            }

            // HOME PAGE WHEN LOADED FIRST
            else 
            {
                page = "Home";
            }
        } // end_of if page not set (current_page === null)
        
        // Else - current_page is set
        else
        {
            page = localStorage.getItem("current_page");
        }//EOF else - current_page is set

        //**********************************************//
        //==========Highlight Menu Selection============//
        //**********************************************//

        // Highlight current link
        var header_links = document.getElementsByClassName('mb_link');
        for (var i = 0; i < header_links.length; i++) 
        {
            if (header_links[i].textContent == page)
            {
              //alert("True");
                header_links[i].style.color = "#2a1c51";
              header_links[i].style.backgroundColor = "white";
            }      
        }

        // Clear vars
        localStorage.clear();
        page = "";
