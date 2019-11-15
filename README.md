# Movieshow

### [Demo](https://serjmalko.github.io/movieshow/)
##

This codebase was created to demonstrate various possibilities application built with Angular including routing, form, multi language and more.
 
 Used libraries:
 - [@angular/material](https://material.angular.io/)
 - [@ngx-translate](http://www.ngx-translate.com/)
 
## Build and Deploy
#### Local development
1. Download code 
2. Run npm install
3. Open in browser http://localhost:4200

#### Deploy
Application deploy to Github Pages via [travis-ci](https://travis-ci.org) 
 

## Functionality overview

The example application is a movie finder (i.e. a https://www.imdb.com) called Movieshow. It uses a [OMDb API](http://www.omdbapi.com/) for requests movies and information about them.  

**General Functionality**
 - Find movie by key words
 - Display movie with pagination (more button)
 - Autocomplete input (with lazy loading content)
 - Add movie to basket
 - View|delete movie from the basket  
 - Multi language (en|ru)

## OMDB API Key

For integrate with OMDB API and get information about movies you need generate API Key. 
Follow the [link](http://www.omdbapi.com/apikey.aspx) and can choose you option. Go to email and copy key to environment.ts

