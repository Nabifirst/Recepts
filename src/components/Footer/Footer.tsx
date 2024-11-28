import "./Footer.css";
import img1 from "../../assets/n1.png";
import img2 from "../../assets/n2.jpg";
import img4 from "../../assets/n4.jpg";
import img6 from "../Footer/—Pngtree—youtube social media round icon_8704829.png";
import img7 from "../Footer/whatsapp-logo-whatsapp-icon-whatsapp-transparent-free-png.webp";
import img8 from "../Footer/twitter-icon-free-png.webp";
import img9 from "../Footer/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728-removebg-preview.png";
import img10 from "../Footer/Facebook_Logo_(2019).png";

const Footer = () => {
  return (
    <div className="  bg-slate-100  flex justify-center mt-[50px]">
      <footer className="w-[81%]">
        <div className="footer-top">
          <div className=" flex ">
            <div className="contact sm:hidden md:block">
              <div className="  sm:flex sm:justify-center w-[100%] md:block">
                <img
                  className="w-[50px] h-[50px] rounded-[50px]"
                  src={img2}
                  alt=""
                />
              </div>
              <p className=" text-black">Call</p>
              <p className="text-[12px]  text-black">Call us from 8am to 12am ET.</p>
              <p className="text-[12px]  text-black">1-866-237-8289</p>
            </div>
            <div className="contact sm:hidden md:block">
              <div className=" sm:flex sm:justify-center w-[100%] md:block">
                <img
                  className="w-[50px] h-[50px] rounded-[50px]"
                  src={img4}
                  alt=""
                />
              </div>
              <p className="  text-black">Email</p>
              <p className="text-[12px]  text-black">
                Our response time is 1 to 3 business days.
              </p>
              <a href="#" className="text-[12px]  relative bottom-[5px]">
                Send a Message
              </a>
            </div>
          </div>
          <div className="subscribe">
            <p className="  text-black">Let’s keep in touch</p>
            <p className="text-[12px]  text-black">
              Get recommendations, tips, updates, promotions and more.
            </p>
            <div className="flex items-center">
              <input type="email" placeholder="Enter your email address" />
              <button className=" w-[100px] h-[40px] ">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-middle">
          <div className="">
            <div className=" sm:flex sm:justify-center md:block w-[100%]">
              <img src={img1} alt="" />
            </div>
            <p className="  text-black mt-[10px] sm:text-center md:text-start w-[100%]">
              Best For Shopping
            </p>
            <p className="  text-black mt-[10px] w-[200px] text-[12px]">
              Sed do eiusmod tempor incididuntut labore dolore magna.
            </p>
            <div className=" flex items-center">
              <div className="sm:ml-[7px] flex gap-[6px]">
                <img className="w-[35px] ml-[-7px] rounded-[10px]" src={img10} alt="" />
              </div>
              <div>
                <img className="w-[50px] ml-[-7px] rounded-[10px]" src={img9} alt="" />
              </div>
              <div>
                <img className="w-[40px] ml-[-7px] rounded-[10px]" src={img8} alt="" />
              </div>
              <div>
                <img className="w-[60px] ml-[-9px] rounded-[10px]" src={img7} alt="" />
              </div>
              <div>
                <img className="w-[40px] ml-[-10px] rounded-[10px]" src={img6} alt="" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:hidden sxm:flex justify-center gap-[50px] md:gap-[100px] mt-[20px]">
            <div className="links">
              <h3 className=" text-black">Get to Know Us</h3>
              <a href="#" className="text-[12px]">
                About Us
              </a>
              <a href="#" className="text-[12px]">
                News & Blog
              </a>
              <a href="#" className="text-[12px]">
                Careers
              </a>
              <a href="#" className="text-[12px]">
                Investors
              </a>
              <a href="#" className="text-[12px]">
                Contact Us
              </a>
            </div>
            <div className="links">
              <h3 className="  text-black">Customer Service</h3>
              <a href="#" className="text-[12px]">
                Help Center
              </a>
              <a href="#" className="text-[12px]">
                FAQ's
              </a>
              <a href="#" className="text-[12px]">
                Accessibility
              </a>
              <a href="#" className="text-[12px]">
                Feedback
              </a>
              <a href="#" className="text-[12px]">
                Size Guide
              </a>
              <a href="#" className="text-[12px]">
                Payment Method
              </a>
            </div>

            <div className="links">
              <h3 className="  text-black">Orders & Returns</h3>
              <a href="#" className="text-[12px]">
                Track Order
              </a>
              <a href="#" className="text-[12px]">
                Shipping & Delivery
              </a>
              <a href="#" className="text-[12px]">
                Return & Exchange
              </a>
              <a href="#" className="text-[12px]">
                Price Match Guarantee
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Motta, All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Legal</a>
            <a href="#">Site Map</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
