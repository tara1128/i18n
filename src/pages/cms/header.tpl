<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <meta name="format-detection" content="telephone=no">
    <meta name="keywords" content="<%= htmlWebpackPlugin.options.keywords %>">
    <meta name="description" content="<%= htmlWebpackPlugin.options.description %>">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link type="text/css" href="combo.css" rel="stylesheet">
  </head>
  <body class="body-<%= htmlWebpackPlugin.options.pagename %> body-<%= htmlWebpackPlugin.options.lang %>-">

  <div class="global-wrapper" id="Wrapper">
    
    <div class="global-header" id="Header">
      <ul class="nav">
        <li><a class="nav-link home" href="#"><%= htmlWebpackPlugin.options.menu.home %></a></li>
        <li><a class="nav-link products" href="#"><%= htmlWebpackPlugin.options.menu.products %></a></li>
        <li><a class="nav-link services" href="#"><%= htmlWebpackPlugin.options.menu.services %></a></li>
        <li>I am header.html</li>
        <li><a class="nav-link contact" href="#"><%= htmlWebpackPlugin.options.menu.contact %></a></li>
      </ul>
    </div><!-- #Header -->


