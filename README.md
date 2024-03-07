# rymcu-tracing

copy from https://github.com/M-cheng-web/web-tracing

# Why?

summary rymcu website self's pv


# How to use?

- clone
```bash
git clone git@github.com:rymcu/rymcu-tracing.git
```
- build
```bash
yarn && yarn build
```
- copy dist folder to your project
- see template `index.html` 
```html
<!DOCTYPE html5>
<html>
  <head>
    <!-- copy this to your index.html-->
    <script>
      window.onload = function () {
        var script = document.createElement("script");
        // change this import 
        script.src = "../dist/@rymcu/tracing/umd/index.js";
        script.onload = function () {
          if (window.RYMCUTracing) {
            window.RYMCUTracing.run({
              // request to `dsn/pv`
              dsn: "https://rymcu.com/tracing",
              // validate params
              appName: "rymcu_website",
              appCode: "rymcu_website",
              sdkID: "12bebce2-3194-45ff-93e7-02237385c3a4",
              debug: true,
              // disable
              disablePV: false,
              disablePerformance: true,
              disableError: true,
              disableEvent: true,
            });
          }
        };
        document.head.appendChild(script);
      };
    </script>
  </head>

  <body></body>
</html>

```

- if you want to publish

after build the dist fold will create `package.json`,then you can change the package.json's name and version, then publish to npm
