using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Satva_WebAPI.Models;
using System.Data;
using System.Data.SqlClient;

namespace Satva_WebAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrderController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors("Policy1")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
            select Id, ItemA,ItemB,ItemC,ItemD,SubTotal,Total from dbo.OrderDetails";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrderDetailsCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        [EnableCors("Policy1")]
        [HttpPost]
        public JsonResult Post( Order order)
        {
            string query = @" INSERT INTO  dbo.OrderDetails
(ItemA,ItemB,ItemC,ItemD,SubTotal,Discount,DeliveryCharge,TotalAmount)
VALUES (@ItemA,@ItemB,@ItemC,@ItemD,@SubTotal,@Discount,@DeliveryCharge,@TotalAmount)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrderDetailsCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@ItemA", SqlDbType.Int).Value = order.ItemA;
                    myCommand.Parameters.Add("@ItemB", SqlDbType.Int).Value = order.ItemB;
                    myCommand.Parameters.Add("@ItemC", SqlDbType.Int).Value = order.ItemC;
                    myCommand.Parameters.Add("@ItemD", SqlDbType.Int).Value = order.ItemD;
                    myCommand.Parameters.Add("@SubTotal", SqlDbType.Int).Value = order.SubTotal;
                    myCommand.Parameters.Add("@Discount", SqlDbType.Int).Value = order.Discount;
                    myCommand.Parameters.Add("@DeliveryCharge", SqlDbType.Int).Value = order.DeliveryCharge;
                    myCommand.Parameters.Add("@TotalAmount", SqlDbType.Int).Value = order.TotalAmount;
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Added Successfully");
        }
    }
}
