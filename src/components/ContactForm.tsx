import { addDoc, collection } from "firebase/firestore";
import { db } from "../db/firebase";
import { useState, type EventHandler, type FormEventHandler } from "react";

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [startspinner, setStartSpinner] = useState(false);
  const [state, setState] = useState({
    message: "Send Message",
    status: 0,
  });

  const contactAdd = async () => {
    setStartSpinner(true);
    if (
      name?.length < 6 &&
      email?.length < 6 &&
      message?.length < 6 &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setState({
        message: "Please provide all values correctly",
        status: -1,
      });
      setStartSpinner(false);
      setTimeout(() => {
        setState({
          message: "Send Message",
          status: 0,
        });
      }, 1000);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        message: message,
      });
      console.log("Document written with ID: ", docRef.id);
      setState({
        message: "We will get back to you soon",
        status: 1,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setState({
        message: "Something went wrong.Please try again later",
        status: -1,
      });
    }
    setTimeout(() => {
      setState({
        message: "Send Message",
        status: 0,
      });
    }, 2500);
    setStartSpinner(false);
  };
  return (
    <div className="max-w-screen-xl mx-auto  px-6 md:px-14 xl:px-14 py-12">
      <div id="contact">
        <div className="relative flex text-white flex-col items-center md:flex-row">
          <div className="gap-5 mb-10 mx-auto">
            <span className="text-4xl sm:text-6xl px-1.5 font-medium text-[#013186] underline underline-offset-8 rounded-md p-2">
              Contact
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center md:flex-row my-6 bg-zinc-100 rounded-[45px]">
          <div className="row md:items-center py-12 px-4 md:px-20 md:w-8/12 md:py-10">
            <div className="space-y-8 md:w-full">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-white border text-black text-base rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                  placeholder="Name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-base font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="subject"
                  className="block p-3 w-full text-base text-black bg-white rounded-lg border shadow-sm focus:ring-black focus:border-black"
                  placeholder="Email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-base font-medium text-black dark:text-gray-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  className="block p-2.5 w-full text-base text-black bg-white rounded-lg shadow-sm border focus:ring-black focus:border-black"
                  placeholder="Message"
                  defaultValue={""}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={`w-full rounded-[14px] justify-center  inline-flex ${
                  state.status === 0
                    ? "bg-[#013186]"
                    : state.status === 1
                    ? "bg-[#35941b]"
                    : state.status === -1
                    ? "bg-[#c71e2f]"
                    : ""
                }`}
              >
                {startspinner ? (
                  <div className="flex justify-center py-5  ">
                    <div className="mr-[3px] h-4 w-4 animate-ping rounded-full bg-white [animation-delay:-0.45s]"></div>
                    <div className="mr-[3px] h-4 w-4 animate-ping rounded-full bg-white [animation-delay:-0.30s]"></div>
                    <div className="mr-[3px] h-4 w-4 animate-ping rounded-full bg-white [animation-delay:-0.15s]"></div>
                    <div className="mr-[3px] h-4 w-4 animate-ping rounded-full bg-white [animation-delay:-0s]"></div>
                  </div>
                ) : (
                  <div
                    onClick={contactAdd}
                    className="text-center py-5   w-full text-white text-xl font-normal leading-7"
                  >
                    {state.message}
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="hidden md:grid md:justify-items-end md:w-4/12 md:py-2">
            <img src="./clients/contact.svg" alt="c" width="80%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
