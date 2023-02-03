namespace Satva_WebAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ItemA { get; set; }
        public int ItemB { get; set; }
        public int ItemC { get; set; }
        public int ItemD { get; set; }
        public int SubTotal { get; set; }
        public int Discount { get; set; }
        public int DeliveryCharge { get; set; }
        public int TotalAmount { get; set; }


    }
}
