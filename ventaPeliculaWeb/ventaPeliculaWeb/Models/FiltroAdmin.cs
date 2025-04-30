using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace AgendaTuLookWeb.Models
{
	public class FiltroAdmin : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var Rol = context.HttpContext.Request.Cookies["Rol"];

			if (string.IsNullOrEmpty(Rol))
			{
				context.Result = new RedirectToRouteResult(new { controller = "Auth", action = "Login" });
			}

			if (Rol == "Admin")
			{
				base.OnActionExecuting(context);
			}
			else {
                context.Result = new RedirectToRouteResult(new { controller = "Home", action = "Index" });
            }
            
        }

	}
}
