# Intro

Because HTML, CSS, and JS continue becoming more awesome, we don’t always need a framework these days. But not using a framework shouldn’t mean that other things (not related to design/dev) become more complicated. Arjan is a simple node js tool kit that helps you take your static (html/css/js) projects to production with the  minimum overhead, lowest cost, and best performance. Arjan features an easy to use CLI (made to resemble git) with intuitive commands for each tool in the kit. Because it is NOT a framework, Arjan basically has No barriers to entry.

# The LOAD workflow

## What is LOAD?

Load is an acronym for localize, optimize, audit, deploy. Four things that we repeatedly do to our static site projects. Since these four things aren’t related to the design or the development process of the website, they may fall outside of the expertise of a regular design firm causing a higher overhead. 

Arjan uses several popular node js modules and builds some functionalities on top/besides them to help you LOAD effectively, with 0 overhead. Its CLI is fast and easy to use/integrate into your current process.

## Philosophy

With all the [APIs](https://developer.mozilla.org/en-US/docs/Web/API) and new features that have been and continue being added to the web, including the support for ES6 syntax it seems that vanilla js will always continue becoming more usable and powerful. So in the end, if this is what the browser is using, and its super powerful, unless we have a very specific reason, why should we be using something else that compiles into something else that then compiles into the vanilla js that the browser understands??!

the purpose of the load workflow is to allow to continue doing what your doing (i.e. using HTML5, CSS3 and VanillaJS) and help you take your projects to production with the minimum amount of overhead. Avoid learning any new frameworks. Avoid having to constantly download and maintain many things at once. Avoid having to pay for a service to do all these things for you.


# Getting started

## One time setup

you only have to do this once (when you install arjan for the first time). 

1. Install the arjan cli globally `npm i -g arjan-cli`
2. If you already have a local AWS profile that you intend to use with arjan you can disregard steps 3 - 5.
3. create an IAM user with programmatic access and an admin policy. Run `arjan init IAM_USER_NAME AWS_REGION -g`. this will pop open a browser window with the AWS console.
4. Finish creating the IAM user in the AWS console and hold on to the keys.
5. Update/create the local AWS profile on your machine by adding the profile and keys in the format shown bellow. The AWS profiles are stored in `~/.aws/credentials` on mac/linux or in `C:\Users\USER_NAME\.aws\credentials` on windows.


        [profilename]
        aws_access_key_id = <YOUR_ACCESS_KEY_ID>
        aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>


## Project setup

before being able to use arjan in a particular project you must:

6. go into the projects root directory `cd project_path`
7. run `arjan init AWS_PROFILE AWS_REGION` (without the -g flag)

now you can run any of the LOAD commands (All of the commands are always meant to be run from the root of your project). for more info check out the CLI’s README or run `arjan --help`. For more information on each of the commands check out their respective sections in the docs or run `arjan COMMAND` `--``help`


# Directory Structure

when you run the init command (without the -g flag) it creates some directories and files inside your project. after that, each of the commands will also generate some directories/files. bellow is a depiction of how a simple project that only consists of an index.html file would look after its undergone the LOAD commands (localize, optimize, audit, deploy).  In th eexample the file was translated into spanish.


    |--index.html
    |--es/
    |  |--index.html
    |--dep_pack/
    |  |--index.html
    |  |--es/
    |  |  |--index.html
    |--arjan_config/
    |  |--optimize_config.json
    |  |--audit_config.json
    |  |--changesets/
    |  |--locales/
    |  |  |--en/
    |  |  |  |--index.json
    |  |  |--es/
    |  |  |  |--index.json
    |  |--exports/
    |  |  |--csv/


## key takeaways
- dep_pack is a directory that contains your optimized deployment package. 
- go to this section for more information on available output formats of localization
- everything else is inside the arjan_config directory
    - optimize_config/audit_config contain the default configurations for the optimize/audit commands. when flags arent supplied, the settings defined in these config files are used.
    - changesets contain a json object with the changset name and the template body for that changset as well as any existingResources.
    - locales contains all of your json locales stored according to their language and filename. localenames are equivalent to the path of the file transformed in the following way `filePath.substr(0, filePath.lastIndexOf(".")).replace(/\//g, '_')`
    - exports/csv contains the locales that have been converted into CSV



# Arjan Localize


## Intro

Arjan Localize is node module for automatically localizing and translating html sites. It features a powerful CLI command that allows you to localize multiple pages into multiple languages with a single command. It has a modular API Since it can export content into popular formats like JSON and CSV, it may also work as a very basic content management solution for html sites.


## What is Localization

Localization consists of adapting a product to a particular locality or region. Even though machine translation services like google translate and amazon translate have gotten impressively good, there still are several scenarios were manual intervention is needed. If you are expanding your digital product/service into a new region its important to get everything perfect. Complex grammar rules and slang often cause errors in the translation making some manual intervention or at least revision necessary. Also a project that has been correctly localized will have way better SEO. Additionally text content might not be the only thing that you want to localize; you might also need to use different images/videos and hyperlinks in your different versions.

A common practice is to create JSON files called locales that contain the text content of site/app. then instead of using words in your file you use variables that read from the locale object. This way content modification dont have to be made directly in the code. In genral this makes your internationalized project easier to maintain.

## Automatic localization

Arjan uses the id attributes already present in your html as the keys in the locale. The parser in arjan localize gets all the existing IDs of html elements with text content, and saves them in the locale. If the element didnt have an ID arjan automatically creates an ID for the object with the following format:  The first 12 characters of the text, replacing spaces with underscores and adding the translation index at the end.

## Automatic translation

Arjan localize also helps you to automatically translate your JSON locales and files in up to 54 different languages. It uses AWS’s neural machine translation system which is used in amazon.com. 

## Usage

There’s three ways in which you can use arjan localize. The three are listed bellow with their pros and cons.

1. **Programmatic usage**
    1. Pros: integrate into other programs and workflows
    2. Cons: requires setup for each project
2. **Arjan CLI** 
    1. pros: 
        1. translate multiple pages
        2. bi-directional translation updates
    2. cons: No GUI. basic terminal usage knowledge
3. **The Arjan Localization GUI**
    1. Pros: 
        1. GUI
        2. No AWS account needed.
    2. cons: 
        1. only translate a single page at a time
        2. cannot update translations
## Arjan translate GUI

Arjan translate has a GUI at [arjan.tools/translate](http://arjan.tools/trans;ate.html). The GUI is a form with a dropzone made with [super easy forms](http://supereasyforms.com) which features a node.js lambda function as its backend. The GUI is pretty limited as you cant update your translations but its good for a one time job especially if you dont like using the terminal. 

## CLI

1. go into your sites directory `cd SITE_NAME`
2. run `arjan init SITE_NAME`  Refer to the provider setup section if you haven't used any of the cloud translation APIs.
3. Run the translate command `arjan translate SITE_NAME [FILENAME]`

## Updating content

the translate command generates 2 or 3 things

1. **locale JSON files** for the input and output languages
2. **translated html file/s** with the output language code (es.html or es/about.html)
3. **CSV** file with translations (optional)

Once you have translated your doc you can improve all of your translations by working directly on your neatly organized JSON locale files and running the translate command with the —update flag (-u).

Arjan translations is bi-directional meaning that you can also work on the output HTML files and then run the translate command with the —backwards (-b) flag to update your JSON files.

You can also generate a single CSV file with all the translations for your site by running the translate command with the —export flag (-e). if you use both the —export and —backwards flags you can update the CSV with site data. if you provide the filename arg only translations for that file will be included in the CSV.


## Programmatic Use

1. install the arjan-localize module `npm i arjan-localize`
2. for using the automatic translations feature refer to the [provider setup](http://#provider-setup) section
    const arjanTranslate = require('arjan-translate')
    
    //REGION is the AWS region of your IAM role ex. 'use-east-1'
    //PROFILE is the name of your desired AWS IAM profile ex. 'deafult'
    
    arjanTranslate.Build('REGION', 'PROFILE', function(err, data){
      if(err) console.log(err)
      else {
        //FROM is the language code of your origin file ex. 'en'
        //TO is the language code of your destination file ex. 'es'
        arjanTranslate.TranslateSite('FROM', 'TO');
      }
    })


## Output Path Generation

translate locale considers that you can have 3 different routing formats for a multilingual HTML site. Lets take the following file for example: `blog/posts/post1.html`

1. **none**: You haven't structured your site to be multilingual. 
2. **file**: You are using the language code as the name of the file. for example `blog/posts/article1/``en``.html`
3. **dir:** You are using the language code as the name of the parent directory. i.e. `en``/blog/posts/article1.html`


- In case 1, a directory named with the language code of your output language and the same file structure (excluding ignored directories and non-html files) will be created in the root of your project.
- In case 2, translated files will be saved with the name of the output language i.e. `blog/posts/article1/es.html`
- In Case 3, alike case 1, a directory with the name of the output language will be created in the root.
## Translation Format

The example compares arjan with i18n; Lets suppose our input is an en.html file with the following content: 

    <section>
      <h1 id="title1">Arjan is super cool</h1>
    </section>

After running the translate command we would get the following output:

1. locales/en.json → `{ "title1":"Arjan is super cool" }`
2. en.html 
    1. Arjan→ `<h1 id="title1"> Arjan is super cool </h1>`
    2. I18n → `<h1 id="title1"> {{arjan.t('title1)}} </h1>`

Lets suppose that our input string didnt have an id attribute:

1. locales/en.json → `{ "arjan_is_sup1":"Arjan is super cool" }`
2. en.html 
    1. Arjan → `<h1 id="arjan_is_sup1"> Arjan is super cool </h1>`
    2. en.html → `<h1> {{arjan.t('arjan_is_sup1')}} </h1>`

Notice that an id with the first 12 characters of the string is created. Caps are lower-cased and spaces are replaced with underscores. A number with the index of the translations is inserted at the end (in case there’s another string that starts with the same 12 chars)

**HTML5 option (Coming Soon)** 
if you are using html5 elements in your page (nav, header, section, footer) you can add the html5 option in the translate command. This will generate objects with ids of html5 elements (nav, header, section, footer) and will insert translations as children of the object they belong to. suppose were still using the example above without ids:

1. translations/en.json → `{ "section1":{"arjan_is_sup":"Arjan is super cool" }}`

2. en.html
    1. Arjan ->

    <section id="section1">
       <h1 id="section1_arjan_is_sup"> Arjan is super cool </h1>
    </section>

    1. I18n → 

    <section>   
        <h1> {{arjan.t('section1.arjan_is_sup')}} </h1>
    </section>


## Dont translate (Coming Soon)

You can use the [HTML translate tag](https://www.w3schools.com/tags/att_global_translate.asp) to tell arjan if you dont want to translate a particular element by setting `translate="no"` in your element


## Supported Languages (AWS translate)
| **Language**          | **Language Code** |
| --------------------- | ----------------- |
| Afrikaans             | af                |
| Albanian              | sq                |
| Amharic               | am                |
| Arabic                | ar                |
| Azerbaijani           | az                |
| Bengali               | bn                |
| Bosnian               | bs                |
| Bulgarian             | bg                |
| Chinese (Simplified)  | zh                |
| Chinese (Traditional) | zh-TW             |
| Croatian              | hr                |
| Czech                 | cs                |
| Danish                | da                |
| Dari                  | fa-AF             |
| Dutch                 | nl                |
| English               | en                |
| Estonian              | et                |
| Finnish               | fi                |
| French                | fr                |
| French (Canada)       | fr-CA             |
| Georgian              | ka                |
| German                | de                |
| Greek                 | el                |
| Hausa                 | ha                |
| Hebrew                | he                |
| Hindi                 | hi                |
| Hungarian             | hu                |
| Indonesian            | id                |
| Italian               | it                |
| Japanese              | ja                |
| Korean                | ko                |
| Latvian               | lv                |
| Malay                 | ms                |
| Norwegian             | no                |
| Persian               | fa                |
| Pashto                | ps                |
| Polish                | pl                |
| Portuguese            | pt                |
| Romanian              | ro                |
| Russian               | ru                |
| Serbian               | sr                |
| Slovak                | sk                |
| Slovenian             | sl                |
| Somali                | so                |
| Spanish               | es                |
| Spanish (Mexico)      | es-MX             |
| Swahili               | sw                |
| Swedish               | sv                |
| Tagalog               | tl                |
| Tamil                 | ta                |
| Thai                  | th                |
| Turkish               | tr                |
| Ukrainian             | uk                |
| Urdu                  | ur                |
| Vietnamese            | vi                |



# Arjan Optimize
## Intro

Arjan Optimize helps you optimize all of your static assets with a single command. It takes into account several of the modern web dev directives and uses some of the most popular node modules for minification/compression of assets with a couple of neat features of its own.


## What is minification and why should i use it?

Most CDN’s like cloudfront, allow you to compress file off the fly using GZIP. So why should you minify? Essentially minification and compression are two different techniques that can be used to reduce filesize. One technique doesnt override the the other and for optimal result you should use both. If you want to learn more about minification/gzip compression and their differences, CSS Tricks’s Chris Coyier gives a great exaplanation in this [article](https://css-tricks.com/the-difference-between-minification-and-gzipping/).

## features
1. easy installation
2. compresses images to jpg/png/tiff/webp
3. minifies svg
4. converts images from any format to webp
5. automatically replaces img tags in HTML


## How it works

Arjan optimize scans your current directory recursively and for each file with a different module depending on the files MIME type. Arjan Optimize uses:

- [Terser](https://github.com/terser/terser)
- [csso](https://github.com/css/csso)
- [html-minifier](https://github.com/kangax/html-minifier)
- [Sharp](https://github.com/lovell/sharp)
- [svgo](https://github.com/svg/svgo)
## Formats supported
| **Input** | **Module used** | **Output** | **options**                                                        | **reason used**                                                                                                                                               |
| --------- | --------------- | ---------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| html      | html-minifier   | html       | options                                                            | [best compression](https://www.npmjs.com/package/html-minifier#minification-comparison)                                                                       |
| css       | csso            | css        | [options](https://www.npmjs.com/package/csso#minifysource-options) | [best](http://goalsmashers.github.io/css-minification-benchmark/) overall size+[speed+compression](http://goalsmashers.github.io/css-minification-benchmark/) |
| js        | terser          | js         | Parse, Compress, Mangle                                            | support for [ES6](http://www.ecma-international.org/ecma-262/6.0/), best speed & compression                                                                  |
| svg       | svgo            | svg        | [options](https://www.npmjs.com/package/svgo#what-it-can-do)       | most widely used open source option                                                                                                                           |
| jpeg      | sharp           | jpeg       | options                                                            | [fastest option](https://sharp.pixelplumbing.com/performance#results)                                                                                         |
| png       | sharp           | png        | options                                                            | fastest option                                                                                                                                                |
| webp      | sharp           | webp       | options                                                            | fastest option                                                                                                                                                |
| gif       | sharp           | png        | options                                                            | fastest option                                                                                                                                                |
| tiff      | sharp           | tiff       | options                                                            | fastest option                                                                                                                                                |

## Webp Images

The webp option in Arjan Optimize does 2 things:

1. converts all your images to webp using sharp and saves them (without overwritting images in original format)
2. In the HTML files, it replaces each img tag with a picture tag that holds both its original compressed version and its webp version.

 Because webp is a relatively new format, it [is not supported by all browsers](https://caniuse.com/#feat=webp). The picture tag is a solution that allows unsupported browsers to fall back to the original version of the image. [This article](https://web.dev/serve-images-webp/) goes more in depth on webp and the picture tag. 

suppose we have the following image tag:

    <img src="img/arjan-logo.png" class="img-fluid">

this will be replaced by:

    <picture>
      <source type="image/webp" srcset="img/arjan-logo.png">
      <source type="image/png" srcset="img/arjan-logo.png">
      <img src="img/arjan-logo.png" class="img-fluid">
    </picture>


## CLI

    USAGE
      $ arjan optimize [FILENAME]
    
    ARGUMENTS
      FILENAME  name of the file i.e. index.html
    
    OPTIONS
      -c, --css     minifiy css using cssnano
      -h, --html    compress html using html-minifier
      -i, --images  compress images and if possible maintain the format, otherwise its converted to png.
      -j, --js      minify js using uglify js
    
      -w, --webp    saves a webp version of each image, then replaces each image instance in the html files with a picture tag.


## Programmatic usage



# Arjan Audit 
## Intro

Arjan audit is a simple node module that helps automate the auditing process of static sites during the dev process using Google’s lighthouse 6. 

## Why?

Often times when building a site, the page speed test is one of the last things we do. Sometimes theres a surprise and the score is not that good. To avoid these surprises you can use Arjan Audit in your dev process or even integrate it into your tests.

## How it works

Arjan audit  uses [express](https://expressjs.com/) to serve your site and google [chrome-launcher](https://github.com/GoogleChrome/chrome-launcher) to make a headless launch of google chrome and retrieve the audits from lighthouse 6. Arjan then parses the results returned by lighthouse and returns an organized subset of the results. When used from the CLI, Arjan returns a console report that adds colors and recomendations based on your threshold value.

the threshold value is a number from 0 to 1 that represents your personal threshold for what you consider a decent enough site. the default is .8 (a B) 10 points above from this score is great, anything bellow isn't acceptable. this threshold value will filter out recommendations and add colors to your scores in the report.  


## Getting Started 
1. install the arjan CLI globally. `npm i -g arjan-cli`
2. inside your proejct direcotry, initialize arja `arjan init`
3. run an audit `arjan audit`


## Programmatic use
    const Audit = require('arjan-audit')
    Audit('./', 'index.html', 8080, .7)
    .then(data=> console.log(data))
    .catch(err=>console.log(err))


## The Audit Report

the audit report is a subset of data from the JSON response of lighthouse 6. for more information on the parameters of lighthouse 6 see this [link](http://for more information on audit properties: https://github.com/GoogleChrome/lighthouse/blob/master/docs/understanding-results.md#audit-properties)


    {
      "lh5_score":float,
      "lh6_score":float,
      "main_metrics":{
        "metric":{
          "title":"string",
          "score":float,
          "description":"string"
        }
      },
      "improvements":{
        "improvement":{
          "title":"title",
          "score":float,
          "description":"description",
          "details":{}
        }
      }
    }


## Lighthouse 5 score
| Audit                                                             | Weight |
| ----------------------------------------------------------------- | ------ |
| [First Contentful Paint](https://web.dev/first-contentful-paint/) | 20%    |
| [Speed Index](https://web.dev/speed-index/)                       | 27%    |
| [First Meaningful Paint](https://web.dev/first-meaningful-paint/) | 7%     |
| [Time to Interactive](https://web.dev/interactive/)               | 33%    |
| [First CPU Idle](https://web.dev/first-cpu-idle/)                 | 13%    |

## Lighthouse 6 score

Google recently recalculated the score of what they consdier a healthy fats site. The new LCP metric was introduced and the score weights and metrics were changed. for mor einformation check out Google’s [Web Vitals](https://web.dev/vitals/) 

| Audit                                                                  | Weight |
| ---------------------------------------------------------------------- | ------ |
| [First Contentful Paint](https://web.dev/first-contentful-paint/)      | 15%    |
| [Speed Index](https://web.dev/speed-index/)                            | 15%    |
| [Largest Contentful Paint](https://web.dev/lcp/)                       | 25%    |
| [Time to Interactive](https://web.dev/interactive/)                    | 15%    |
| [Total Blocking Time](https://web.dev/lighthouse-total-blocking-time/) | 25%    |
| [Cumulative Layout Shift](https://web.dev/cls/)                        | 5%     |

## Main Metrics
- first-contentful-paint
- speed-index
- largest-contentful-paint
- total-blocking-time
- interactive
- cumulative-layout-shift
- first-meaningful-paint
- first-cpu-idle
- notification-on-start
## Improvement Options
- largest-contentful-paint-element
- critical-request-chains : 
- layout-shift-elements: 
- robots-txt
- canonical
- color-contrast
- label
- redirects
- content-width
- image-aspect-ratio
- image-size-responsive
- deprecations
- mainthread-work-breakdown
- bootup-time
- uses-rel-preload
- uses-rel-preconnect
- font-display
- aria-allowed-attr
- aria-hidden-body
- aria-hidden-focus
- aria-valid-attr-value
- aria-valid-attr
- button-name
- bypass
- document-title
- duplicate-id-active
- duplicate-id-aria
- frame-title
- heading-order
- html-has-lang
- html-lang-valid
- image-alt
- link-name
- list
- listitem
- meta-viewport
- video-caption
- video-description
- uses-long-cache-ttl
- total-byte-weight
- offscreen-images
- render-blocking-resources
- unminified-css
- unminified-javascript
- unused-css-rules
- unused-javascript
- uses-webp-images
- uses-optimized-images
- uses-text-compression
- uses-responsive-images
- efficient-animated-content
- appcache-manifest
- doctype
- charset
- dom-size
- external-anchors-use-rel-noopener
- no-document-write
- no-vulnerable-libraries
- js-libraries
- password-inputs-can-be-pasted-into
- uses-passive-event-listeners
- meta-description
- http-status-code
- font-size
- link-text
- is-crawlable
- tap-targets
- hreflang
- plugins
- 
# Arjan Deploy
# Intro

Arjan deploy is a tool that helps you deploy static websites to the AWS cloud using Cloudformation. The tool is modular and can be used with the Arjan CLI, or programmatically in your own node.js project. Arjan Deploy gives you several different options to deploy your static sites in AWS and it also helps you import existing AWS projects, or individual resources into your websites project.

## Why not just use the AWS SDK for JS and CloudFormation directly?

It turns out things get a bit trickier than expected when throwing in a CDN with HTTPS into the equation. As of now, to host a static site with HTTPS in AWS it requires more than one template and/or the use of multiple operations in the SDK.

## Static site architectures

Generally static sites in the cloud consist of an object storage solution (i.e. S3), a DNS (from your domain name provider or your cloud provider) a CDN or cache distribution network, and optionally may contain a digital certificate. Arjan Gives you options to add the following resources to your stack depending on your needs. 

**root**: an s3 bucket for the root domain
**dns**: Adds a Route53 Hosted zone to your stack. 
**cdn**: Adds an AWS Cloudfront distribution to your sites stack. More about Cloudfront.
**https**: creates a digital certificate for your domain with AWS ACM. If you have a route53 DNS it will automatically verify your certificate. Else you must manually verify your certificate with your DNS provider. 
**www**: a reroute bucket for www

## Usage
1. go to your project's directory `cd your_project`
2. run `arjan init PROFILE REGION`
3. If you want your site to be online while still in development you can run `arjan deploy DOMAIN create`
4. Then to update your stack to production you can run `arjan deploy DOMAIN update prod` this will add a route53 DNS, a cloudfront distribution and a verified SSL ceritifcate to your stack.
5. alternatively you can just run `arjan deploy DOMAIN create prod` from the start.

In order to deploy a production site you must have already purchased a domain from a domain name registrar and you should have their respective interface open in order to create DNS records or transfer nameservers. there are several popular options out there; we like to use namecheap because as the name suggests it, its cheap, and it also has great service.

## Programmatic Usage


## Setups

For an easier development workflow we have defined some setups that include dev, test and prod (production). you can customize these by additionally providing flags.
**dev → test → prod**


1. **Dev:** S3 root bucket with a public policy
2. **Test:** S3 root bucket, www reroute bucket and a route53 hosted zone.
3. **Prod:** CDN w/ Route53 DNS (https)**:** Deploys s3 bucket, route53 DNS, a cloudfront distribution and creates TLS certificates in AWS ACM.

**Custom Setup Examples**

1. **CDN w/ Route53 DNS (http):** Deploys s3 bucket, route53 DNS, and a cloudfront distribution.
2. **CDN w/ external DNS (http):** Deploys s3 bucket and a Cloudfront distribution. You must create a CNAME record (and reroute record) in your external DNS.
3. **CDN w/ external DNS (https)**: Deploys s3 bucket and a Cloudfront distribution and creates certificates in ACM. You must create a CNAME record (and optionally a reroute record) in your external DNS.
## Route53 DNS

Amazon Route 53 provides highly available and scalable Domain Name System (DNS), domain name registration, and health-checking web services. It is designed to give developers and businesses an extremely reliable and cost effective way to route end users to Internet applications by translating names like example.com into the numeric IP addresses, such as 192.0.2.1, that computers use to connect to each other.

AWS Route53 has a $0.50/month cost (6$ a year). Its a better option than a standard DNS because:

- Route 53 offers powerful routing policies to allow for efficient DNS requests.
- You can combine your DNS with health-checking services to route traffic to healthy endpoints or to independently monitor and/or alarm on endpoints. 
- Route 53 effectively connects user requests to infrastructure running in AWS – such as Amazon EC2 instances, Elastic Load Balancing load balancers, or Amazon S3 buckets
- can also be used to route users to infrastructure outside of AWS.
## Using an External DNS

You can only use an external DNS if you include the CDN option and exclude the route53 option. If you are using an external DNS a CNAME record pointing to the root will invalidate all other records pointing to the root; so if you have other records pointing to your root, for example mail exchange (MX) records to send/receive email with your custom domain you will have to perform some additional steps.

Instead of pointing the CNAME record to the root, you can point to the CNAME to the www subdomain. Then you can create a reroute or FWD record in your DNS provider console to reroute all http requests coming in to the root to the www.
You can check out the following links to learn how to reroute requests in major DNS providers

- Namecheap
- Godaddy
- Marcaria
- Google domains


# CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/arjancli.svg)](https://npmjs.org/package/arjancli)
[![Downloads/week](https://img.shields.io/npm/dw/arjancli.svg)](https://npmjs.org/package/arjancli)
[![License](https://img.shields.io/npm/l/arjancli.svg)](https://github.com/arjan-tools/cli/blob/master/package.json)

```
sh-session
$ npm install -g arjan-cli
$ arjan COMMAND
running command...
$ arjan (-v|--version|version)
arjan-cli/0.1.0 linux-x64 node-v12.13.1
$ arjan --help [COMMAND]
USAGE
  $ arjan COMMAND
...
```

## Commands

* [`arjan audit`](#arjan-audit)
* [`arjan deploy SITE ACTION [SETUP]`](#arjan-deploy-site-action-setup)
* [`arjan help [COMMAND]`](#arjan-help-command)
* [`arjan init [REGION] [PROFILE]`](#arjan-init-region-profile)
* [`arjan localize LANGUAGE [FILES]`](#arjan-localize-language-files)
* [`arjan optimize [FILENAME]`](#arjan-optimize-filename)
* [`arjan upload`](#arjan-upload)

## arjan audit

Describe the command here

```
USAGE
  $ arjan audit

OPTIONS
  -d, --dir=dir              Directory path to serve. default is root (relative to the path in which you run the
                             command)

  -f, --file=file            Path of the page you want to audit. default is index.html

  -p, --port=port            Port used for the test server. Default is 8080.

  -t, --threshold=threshold  Integer value from 0 to 1 that represents what you consider to be an acceptable lighthouse
                             score for your site. Its very similar to what you would consider an acceptable school test
                             grade.

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/audit.js](https://github.com/arjan-tools/cli/blob/v0.1.0/src/commands/audit.js)_

## arjan deploy SITE ACTION [SETUP]

Describe the command here

```
USAGE
  $ arjan deploy SITE ACTION [SETUP]

ARGUMENTS
  SITE    name of the site i.e. yoursite.com

  ACTION  (create|update|import|delete|upload) choose an action to perform. you can create, update, import your stack or
          upload files to your bucket.

  SETUP   (dev|test|prod|custom) [default: dev] setup for the site - dev, test, production or custom

OPTIONS
  -c, --cdn            creates a CloudFront distribution for your site.
  -e, --error=error    [default: error.html] name of the error document

  -h, --https          creates and validates a TLS certificate for your site. If you arent using a route53 DNS you must
                       create a CNAME record manually in your DNS.

  -i, --index=index    [default: index.html] name of the index document. default is index.html

  -r, --route53        creates a Hosted Zone in route 53. Have your current DNS provider page open and ready to add a
                       custom DNS.

  -u, --upload=upload  name of a specific file you want to upload to your site. all uploads all of the files

  -w, --www            creates a www s3 bucket that reroutes requests to the index.

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/deploy.js](https://github.com/arjan-tools/cli/blob/v0.1.0/src/commands/deploy.js)_

## arjan help [COMMAND]

display help for arjan

```
USAGE
  $ arjan help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src/commands/help.ts)_

## arjan init [REGION] [PROFILE]

Describe the command here

```
USAGE
  $ arjan init [REGION] [PROFILE]

ARGUMENTS
  REGION   [default: us-east-1] AWS Region
  PROFILE  [default: default] AWS Profile

OPTIONS
  -a, --audit     builds required files/dirs for arjan audit
  -d, --deploy    builds required files/dirs for arjan deploy
  -l, --localize  builds required files/dirs for arjan localize
  -o, --optimize  builds required files/dirs for arjan optimize

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/init.js](https://github.com/arjan-tools/cli/blob/v0.1.0/src/commands/init.js)_

## arjan localize LANGUAGE [FILES]

Describe the command here

```
USAGE
  $ arjan localize LANGUAGE [FILES]

ARGUMENTS
  LANGUAGE  origin language of the file/s.

  FILES     name of the file you want to translate -only html files accepted. Use all to translate all of your html
            files (default).

OPTIONS
  -b, --backwards            Update JSON locale accoridng to changes made in the HTML file. Must be used together with
                             the update flag.

  -c, --create               Create locale/s for your site. When used with translate flags, it generates a translated
                             version of the locale and the HTML.

  -e, --export               Creates a CSV file for your JSON locale.

  -i, --import               Update JSON locale from changes made in the CSV file

  -t, --translate=translate  desired translation language. You may apply this flag multiple times to translate into
                             multiple languages.

  -u, --update               Update HTML file accoridng to changes made in the JSON locale.

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/localize.js](https://github.com/arjan-tools/cli/blob/v0.1.0/src/commands/localize.js)_

## arjan optimize [FILENAME]

Describe the command here

```
USAGE
  $ arjan optimize [FILENAME]

ARGUMENTS
  FILENAME  name of the file i.e. index.html

OPTIONS
  -c, --css     minifiy css using cssnano
  -h, --html    compress html using html-minifier
  -i, --images  compress images and if possible maintain the format. otherwise its converted to png.
  -j, --js      minify js using uglify js

  -w, --webp    saves a webp version of each image, then replaces each image instance in the html files with a picture
                tag.

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/optimize.js](https://github.com/arjan-tools/cli/blob/v0.1.0/src/commands/optimize.js)_

## arjan upload

Describe the command here

```
USAGE
  $ arjan upload

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/upload.js](https://github.com/arjan-tools/cli/blob/v0.1.0/src/commands/upload.js)_
<!-- commandsstop -->


# API

## Arjan Build

**createDir(dir)**
- **Description:** Writes a directory only if it didnt previously exist.
- **params:(dir)**
    - **dir:** string: name of the directory to build.
- **returns:** Promise(resolve, reject)
    - **resolve:** boolean: true
    - **reject:** error
 
**createFile(file, contents)**
- **Description:** Writes a file only if the file didn't previously exist.
- **params:(file, contents)**
    - **filePath:** string: path of the file
    - **contents:** string: contents of the file as a string.
- **returns:** Promise(resolve, reject)
    - **resolve:** string: contents of the file
    - **reject:** error

**initBuild(region, profile)**
- **Description:** builds some required directories and files in your project.
- **params**:**(region, profile)**
    - **region**: string: desired AWS region
    - **profile**: string: local AWS profile
- **returns**: Promise(resolve, reject)
    - **resolve**: string: ‘built’
    - **reject**: error

## Arjan Localize

**CreateLocale(html)**  
- **Description:** Parses the HTML of the input file; then for all elements that contain text it adds an ID. Then it generates or re-writes a JSON file that contains ids and the text values.
- **Params: (html)**
    - **html:** string: HTML content to parse.
- **returns:** Promise(resolve, reject)
    - **resolve: ({size:size, locale:locale, html:html1})**
        - **size:**  int: number of items in the locale
        - **locale:** string: JSON string with the locale.
        - **html:** string: Modified HTML containing the necessary ID’s
    - **reject:** error

**TranslateLocale(input, from, to, size)**
- **Description:** Translates each value using amazon translate then generates or re-writes a JSON file that contains ids and translated values. 
- **params: (input, from, to, size)**
    - **input:** string: Locale to parse
    - **language:** string: Approporiate lanugage code for the input locale’s language.
    - **translation:** string: Appropriate lanugage code for the desired output language
    - **size:** int
- **returns:** Promise(resolve, reject)
    - **resolve:** translation: string
    - **reject:** error

**TranslateHtml(html, json)**
- **description:** Replace text content in an HTML document according to the values in the provided JSON locale.
- **params:(html, json)**
    - **html:** string: html string to parse.
    - **json:** string: JSON string containing text values for the html (in the translated language).
- **returns:** Promise(resolve, reject)
    - **resolve:** string: The translated html file
    - **reject:** error   

**jsonToCsv(lang, obj)**
- **description:** converts a JSON locale into a CSV.
- **params:(lang, obj)**
    - **lang:** string: Approproate language code for the language of the file.
    - **obj:** string: Properly formatted JSON locale as a string.
- **returns:** Promise(resolve, reject)
    - **resolve:** csv: string: a string with the output CSV
    - **reject:** error
    
**csvToJson(lang, csv)**
- **description:** reads a CSV file and converts it to JSON
- **params: (lang, csv)**
    - **lang:** string: Approproate language code for the language of the file
    - **csv:** string: a string formatted in CSV.
- **returns:** Promise(resolve, reject)
    - **resolve:** string: a string with the JSON object.
    - **reject:** error

## Arjan Optimize

**copyFile(filename, output)**
- **Description:** Copy a file into another directory.
- **params:** **(filename, output)**
    - **filename:** string: Path of the file
    - **outputDir:** string: the output directory in which you want to save the file
- **returns:** Promise(resolve, reject)
    - **resolve:** string: path of the file
    - **reject:** error
    
**scanFolder(currentDirPath, outputDir, ignorePaths, callback)**
- **description:** Recursively scans folder and creates arrays that contain the filepaths for each MIME type.
- **params:** **(currentDirPath, outputDir, ignorePaths, callback)** 
    - **currentDirPath:** string: Path of the current directory
    contents: string
    - **outputDir:** string: output directory in which to copy the file to.
    - **ignorePaths:** Object: a json object that contains filepaths to ignore as values and true|false as values.
    - **callback:** **(filePath, stat)**
    
**compressImages(filePath, output, imageArr, svgoConfig)**
- **description:** Compresses an image according to its MIME type. Uses Sharp to compress most image formats and uses SVGO to minimize svgs.
- **params:(filePath, output, imageArr, svgoConfig)**
    - **filePath:** string: Path of the image
    - **output:** string: desired directory in which to save the compressed image
    - **imageArr:** array: contains paths of images being compressed
    - **svgoConfig:** Object: object with the options for svgo.
- **returns:** Promise(resolve, reject)
    - **resolve:**  int: size of image in bytes
    - **reject:** error
    
**compressWebp(filePath, outputDir)**
- **description:** Converts an image into webp using sharp. 
- **params: (filePath, outputDir)**
    - **filePath:** string: Path of the image
    - **outputDir:** string: desired output directory in which to save the compressed image.
- **returns:** Promise(resolve, reject)
    - **resolve:** int: size of image in bytes
    - **reject:** error
    
**replaceWebp(imgPath, html)**
- **description:** Parses your html document and replaces all img tags referencing the imagePath with a picture tag that contains the webp and regular/compressed versions of the image.
- **params: (imgPath, html)**
    - **imgPath:** string: path of the image
    - **html:** string: html string in which you want to find and replace the image.
- **return:** Promise(resolve, reject)
    - **resolve:** int: size of image in bytes
    - **reject:** error
    
## Arjan Audit

**runAudit(dir, index, port, threshold)**
- **description:** starts a simple local static server with express, runs a lighthouse audit using lighthouse 6. Then it returns a JSON object with lighthouse scores + audit report details and exits the local server.
- **params: (dir, index, port, threshold)**
    - **dir:** string: desired direcotry to serve e.g. dep_pack
    index: string: path of the file you want to audit; typically index.html.
    - **port:** int: desired port number to use in the audit.
    - **threshold:** float: number between 0 and 1. something bellow the threshold is considered a bad score. e.g. if you are a B student your threshold would be .8
- **returns:** Promise(resolve, reject)
    - **resolve:** string: formatted
    - **reject:** error

## Arjan Deploy

**generateTemplate(domainName, index, error, www, cdn, route53, https)**
- **description:** Generates a JSON cloudFormation template for your stack.
- **params: (domainName, index, error, www, cdn, route53, https)**
    - **domainName:** string: domain name of your site i.e. yoursite.com
    - **index:** string: Index document for your site i.e. index.html
    - **error:** string: error document for your site i.e. error.html
    - **www:** boolean: option to add re route  bucket from www to root 
    - **cdn:** boolean: option to add a Cloudfront distribuition to your stack
    - **route53:** boolean: option to add a Domain Name System DNS
    - **https:** boolean: option to add a digital certificate 
- **returns:** Promise(resolve, error)
    - **resolve({"template":template, "existingResources": ResourcesToImport})**
        - **template:** string: stringified JSON cloudformation template
        - **existingResources:** Array: An array containing existing AWS resources that are included in the template.
    - **reject:** error
    
**deployStack(domainName, template, existingResources, importAction)**
- **description:** Creates  a cloudformation changeset and executes it.
- **params: (domainName, template, existingResources, importAction)**
    - **domainName:** string: Domain name of your site i.e. yoursite.com
    - **template:** string: stringified JSON cloudformation template
    - **existingResources:** Array: An array containing existing AWS resources that you want to import into your stack (resourcesToImport).
    - **importAction:** boolean: true|false. True if you want to execute an import. false if you want to execute a create|update.
- **returns:** Promise(resolve, error)
    - **resolve({stackName:stackName, changeSetName:changeSet.name, action:changeSet.action})**
        - **name:** string: Name of the cloudformation stack
        - **changeSet:** string: Name of the changeset
        - **action:** string: action to execute in cloudformation. options include: create|update|delete.
    - **reject:** error
    
**createChangeSet(stackName, template, existingResources, importAction)**
- **description:** Creates a changeset in AWS cloudformation.
- **params: (stackName, template, existingResources, importAction)**
    - **stackName:** string: Name of the cloudformation stack
    - **template:** string: stringified JSON cloudformation template
    - **existingResources:** Array: An array containing existing AWS resources that you want to import into your stack (resourcesToImport).
    - **importAction:** boolean: true|false: true if you want to execute an import. false if you want to execute a create|update.
    - **returns:** Promise(resolve, reject)
        - **resolve({changeSetName:changeSetName, action:action})**
            - **name:** string: Name of the changeset
            - **action:** string: action to execute in cloudformation. options include: create|update|delete.
        - **reject:** error
    
**requestCertificate(domainName)**
- **description:** requests an ACM certificate.
- **params: (domainName)**
    - **domainName:** string: domain of your site i.e. yoursite.com
- **returns:** Promise(resolve, reject)
    - **resolve:** string: ARN of the ACM certficate
    - **reject:** error    

**describeCertificate**
- **description:** gets the CNAME records required to verifiy the ACM certificate.
- **params: (certificateArn)**
    - **certificateArn:** string: ARN (amazon resource number) for the ACM certificate.
- **returns: Promise(resolve, reject)**
    - **resolve:** ({"cName": cName, "cValue": cValue})
        - **cName:** string: name of the CNAME record
        - **cValue:** string: value of the CNAME record
    - **reject:** error
    
**validateCertificate**
- **description:** validates an ACM certificate by creating the required records in route53.
- **params: (cName, cValue, stackName)**
    - **cName:** string: name of the CNAME record
    - **cValue:** string: value of the CNAME record
    - **stackName:** string: name of the CloudFormation stack
- **returns: Promise(resolve, reject)**
    - **resolve:**  string: “record for certificate created”
    - **reject:** error
    
**createCertificate**
- **description:** requests and validate an ACM certificate
- **params: (domainName, stackName, route53)**
    - **domainName:** string
    - **stackName:** string
    - **route53:** boolean
- **returns:** Promise(resolve, reject)
    - **resolve:** arn: string
    - **reject:** error
    
**importCertificate(domain, template, existingResources, https, route53, certArn)**
- **description:** import an ACM certificate into your stack.
- **params: (domain, template, existingResources, https, route53, certArn)**
    - **domain:** string: domain of your site i.e. yoursite.com
    - **template:** string
    - **existingResources:** string
    - **https:** string
    - **route53:** string
    - **certArn:** string
- **returns:** Promise(resolve, reject)
    - **resolve:** string: existingResources
    - **reject:** error
    
**stackExists(stackName)**
- **description:** check if a given cloudFormation stack exists. if the stack doesnt exist, the promise resolves with a null value.
- **params: (stackName)**
    - **stackName:** string: name of the stack
- **returns:** Promise(resolve, reject)
    - **resolve:** string: id of the cloudformation stack or null
    - **reject:** error
    
**bucketExists(domainName)**
- **description:** check if a given bucket exists.
- **params: (domainName)**
    - **domainName:** string: domain of your site i.e. yoursite.com
- **returns:** Promise(resolve, reject)
    - **resolve:** boolean: true|false
    - **reject:** error
    
**distributionExists**
- **description:** check if a cloudFormation distribution exists for a given domain. if it doesnt exist, the promise resolves a null.
- **params: (domainName)**
    - **domainName:** string: domain of your site i.e. yoursite.com
- **returns:** Promise(resolve, reject)
    - **resolve:** obj: {"id":cloudfront_dist_id, "domainName":domain}
    - **reject:** error
    
**certificateExists(domainName)**
- **description:** check if an ACM certificate exists for a given domain.
- **params: (domainName)**
    - **domainName:** string: your sites domain i.e. yoursite.com
- **returns:** Promise(resolve, reject)
    - **resolve:** string: ARN of the ACM certificate
    - **reject:** error
    
**hostedZoneExists(domainName)**
- **description:** check if a hosted zone exists for a given domain.
- **params: (domainName)**
    - **domainName:** string: domain of your site i.e. yoursite.com
- **returns:** Promise(resolve, reject)
    - **resolve:** string: Id of the hosted zone
    - **reject:** error
    
**newHostedZone(stackName)**
- **description:** returns the 4 nameservers for the hostedzone associated to a given stack.
- **params: (stackName)**
    - **stackName:** string: name of the cloudformation stack.
- **returns:** Promise(resolve, reject)
    - **resolve:** array: string: nameservers
    - **reject:** error

**DeleteSite(stackName)**
- **description:** deletes a cloudformation stack
- **params:** (stackName)
    - **stackName:** string
- **returns:** Promise(resolve, reject)
    - **resolve:** string:  stackName + ' cloudFormation Stack is being deleted.’
    - **reject:** error

**deleteCertificate(domain)**
- **description:** deletes ACM certificates and existing route53 records for a given certificate.
- **params:** (domain)
    - **domain:** string: domain of the site
- **returns:** Promise(resolve, reject)
    - **resolve:** string:  stackName + ' cloudFormation Stack is being deleted.’
    - **reject:** error

