﻿using Microsoft.AspNet.Mvc;


namespace Stork.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}