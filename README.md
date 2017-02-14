# generator-aspnet [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Validate dotnet async tasks

## Usage

The updated flow based on configuration files:

```
➜  development yo aspnet2

     _-----_     ╭──────────────────────────╮
    |       |    │    Welcome to the new,   │
    |--(o)--|    │         polished         │
   `---------´   │     generator-aspnet     │
    ( _´U`_ )    │        generator!        │
    /___A___\   /╰──────────────────────────╯
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? What type of dotnet template do you want to instantiate? (Use arrow keys)
❯ Project Template 
  Item Template 
```

```
➜  development yo aspnet2
? What type of dotnet template do you want to instantiate? Project Template
? Select project template to instantiate: (Use arrow keys)
❯ Class library (C#) 
  Class library (F#) 
  Console Application (C#) 
  Console Application (F#) 
  Unit Test Project (C#) 
  Unit Test Project (F#) 
  xUnit Test Project (C#) 
  xUnit Test Project (F#) 
  Empty ASP.NET Core Web Application (C#) 
  MVC ASP.NET Core Web Application (C#) 
  MVC ASP.NET Core Web Application (F#) 
  Web API ASP.NET Core Web Application (C#)
```

```
➜  development yo aspnet2
? What type of dotnet template do you want to instantiate? Item Template
? Select item template to instantiate: (Use arrow keys)
❯ Nuget Config 
  Solution File 
  Web Config 
```

```
? What type of dotnet template do you want to instantiate? Project Template
? Select project template to instantiate: Unit Test Project (F#)
dotnet new mstest -lang F#
Content generation time: 73.8738 ms
The template "Unit Test Project" created successfully.
```

## Author

@peterblazejewicz
