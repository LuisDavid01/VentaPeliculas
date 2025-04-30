using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace AgendaTuLookWeb.Models
{
	public class FiltroSesion : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var token = context.HttpContext.Request.Cookies["Token"];

			if (string.IsNullOrEmpty(token))
			{
				context.Result = new RedirectToRouteResult(new { controller = "Auth", action = "Login" });
			}
			base.OnActionExecuting(context);
		}

	}
}
