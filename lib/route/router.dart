import 'package:amazon_clone/features/splash/screens/splash_screen.dart';
import 'package:amazon_clone/route/route_path.dart';
import 'package:flutter/material.dart';

import '../features/auth/screens/auth_screen.dart';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case RoutePath.splash:
      return MaterialPageRoute(
        builder: (_) => const SplashScreen(),
      );
    case RoutePath.auth:
      return MaterialPageRoute(
        builder: (_) => const AuthScreen(),
      );
    default:
      return MaterialPageRoute(
        builder: (_) => Scaffold(
          body: Center(
            child: Text('No route defined for ${settings.name}'),
          ),
        ),
      );
  }
}