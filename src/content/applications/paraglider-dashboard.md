---
title: "Paraglider Dashboard"
date: 2026-11-24
aliases: ["/posts/paraglider-dashboard/"]
tags: ["applications", "android"]
description: "Paraglider Dashboard is an Android flight display that computes the wind while you fly, including on a paramotor."
summary: "Paraglider Dashboard is an Android flight display that computes the wind while you fly, including on a paramotor."
image: "images/dashboard.png"
---

Paraglider Dashboard, by D-MBLD, is an Android flight display aimed at paragliders and powered paragliders. Its main job is to work out the wind speed and wind direction while you are in the air, and to keep that answer on screen with the rest of the flight.

It is glove-friendly on purpose. With glove control on, you do not have to tap the glass.

## What you see

Swipe between five views:

- Wind triangle
- Tachometer
- Map with airspace and your track
- Speed vectors, which are the basis of the wind calculation
- An overview of all of those views

Info boxes stay on screen with the main flight numbers. A variometer can use GPS or, optionally, the phone's pressure sensor.

## Flying with it

- Replay a wind triangle for different wind cases before you commit to a goal.
- Set a destination with a long press on the map, or pick one from a waypoint list.
- See an arrival time that already includes the wind you are flying in.
- Load airspace in OpenAir format.
- Record the flight and keep past flights in a logbook.
- Save the track as an unsigned IGC file. Contests that require a signed logger will not accept that file on its own.
- Replay an IGC file in simulation mode, which is the safe way to learn the screens.
- Switch between metric and imperial units. Altitude can show meters, feet, or the two in turn.
- Built-in help pages.

## Glove control

Turn glove control on and a menu is driven by the proximity sensor. Hold a hand over the phone and the menu opens and scrolls. Take the hand away and the highlighted action runs. You can change views without finding a fingertip of glove.

The app asks for location, for permission to stay awake, for internet access so it can draw the map, and for storage so it can write the IGC file when you close it.

[![Get it on Google Play](../../../static/images/google-play.png)](https://play.google.com/store/apps/details?id=com.eb.ohrh.parawind.free)
