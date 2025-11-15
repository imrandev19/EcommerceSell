"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Districts + Thanas list (example Bangladesh)
const data = {
  "Bagerhat": [
    "Bagerhat Sadar","Chitalmari","Fakirhat","Kachua","Mollahat",
    "Mongla","Morrelganj","Rampal","Sarankhola"
  ],

  "Bandarban": [
    "Bandarban Sadar","Thanchi","Lama","Naikhongchhari",
    "Ali Kadam","Rowangchhari","Ruma"
  ],

  "Barguna": [
    "Amtali","Bamna","Betagi","Barguna Sadar","Patharghata","Taltali"
  ],

  "Barisal": [
    "Barisal Sadar","Agailjhara","Babuganj","Bakerganj","Banaripara",
    "Gaurnadi","Hizla","Mehendiganj","Muladi","Wazirpur"
  ],

  "Bhola": [
    "Bhola Sadar","Daulatkhan","Borhanuddin","Tazumuddin",
    "Lalmohan","Char Fasson","Manpura"
  ],

  "Bogra": [
    "Adamdighi","Bogura Sadar","Dhunat","Dupchanchia","Gabtali",
    "Kahaloo","Nandigram","Sariakandi","Shajahanpur","Sherpur",
    "Shibganj","Sonatala"
  ],

  "Brahmanbaria": [
    "Brahmanbaria Sadar","Ashuganj","Bancharampur","Kasba","Nabinagar",
    "Nasirnagar","Sarail","Bijoynagar"
  ],

  "Chandpur": [
    "Chandpur Sadar","Faridganj","Hajiganj","Kachua","Matlab Dakshin",
    "Matlab Uttar","Shahrasti","Haimchar"
  ],

  "Chapainawabganj": [
    "Nawabganj Sadar","Bholahat","Gomastapur","Nachole","Shibganj"
  ],

  "Chittagong": [
    "Chattogram Sadar","Pahartali","Kotwali","Panchlaish","Bayazid",
    "Chandgaon","Chandanaish","Fatikchhari","Hathazari","Boalkhali",
    "Sitakunda","Raozan","Rangunia","Lohagara","Banshkhali",
    "Anwara","Patia","Sandwip","Mirsharai"
  ],

  "Chuadanga": [
    "Chuadanga Sadar","Alamdanga","Damurhuda","Jibannagar"
  ],

  "Comilla": [
    "Comilla Sadar","Comilla Sadar Dakshin","Burichong","Brahmanpara",
    "Chandina","Chouddagram","Daudkandi","Debidwar","Homna",
    "Laksam","Manoharganj","Meghna","Muradnagar","Nangalkot",
    "Titas"
  ],

  "Cox's Bazar": [
    "Cox's Bazar Sadar","Chakaria","Kutubdia","Maheshkhali",
    "Ramu","Teknaf","Ukhia","Pekua"
  ],

  "Dhaka": [
    "Dhanmondi","Gulshan","Mirpur","Uttara","Tejgaon","Pallabi",
    "Mohammadpur","Lalbagh","Sutrapur","Khilgaon","Khilkhet",
    "Badda","Cantonment","Demra","Keraniganj","Savar","Dohar",
    "Nawabganj","Hazaribagh","Ramna","Motijheel","Shahbagh"
  ],

  "Dinajpur": [
    "Dinajpur Sadar","Birganj","Birampur","Bochaganj","Chirirbandar",
    "Fulbari","Ghoraghat","Hakimpur","Kaharole","Khansama",
    "Nawabganj","Parbatipur"
  ],

  "Faridpur": [
    "Faridpur Sadar","Boalmari","Alfadanga","Bhanga","Charbhadrasan",
    "Nagarkanda","Madhukhali","Sadarpur","Saltha"
  ],

  "Feni": [
    "Feni Sadar","Chhagalnaiya","Daganbhuiyan","Parshuram","Fulgazi","Sonagazi"
  ],

  "Gaibandha": [
    "Gaibandha Sadar","Gobindaganj","Palashbari","Sadullapur",
    "Saghata","Sundarganj","Fulchhari"
  ],

  "Gazipur": [
    "Gazipur Sadar","Kaliakair","Kapasia","Sreepur","Kaliganj"
  ],

  "Gopalganj": [
    "Gopalganj Sadar","Kashiani","Tungipara","Kotalipara","Muksudpur"
  ],

  "Habiganj": [
    "Habiganj Sadar","Lakhai","Madhabpur","Bahubal","Baniachang",
    "Ajmiriganj","Nabiganj","Chunarughat"
  ],

  "Jamalpur": [
    "Jamalpur Sadar","Sarishabari","Madarganj","Islampur","Melandaha",
    "Dewanganj","Bakshiganj"
  ],

  "Jessore": [
    "Jessore Sadar","Abhaynagar","Bagherpara","Chaugachha","Jhikargachha",
    "Keshabpur","Manirampur","Sharsha"
  ],

  "Jhalokathi": [
    "Jhalokathi Sadar","Kathalia","Nalchity","Rajapur"
  ],

  "Jhenaidah": [
    "Jhenaidah Sadar","Harinakundu","Kaliganj","Kotchandpur",
    "Maheshpur","Shailkupa"
  ],

  "Joypurhat": [
    "Joypurhat Sadar","Akkelpur","Kalai","Khetlal","Panchbibi"
  ],

  "Khagrachari": [
    "Khagrachari Sadar","Dighinala","Mahalchhari","Matiranga",
    "Panchhari","Ramgarh","Guimara","Manikchhari"
  ],

  "Khulna": [
    "Khulna Sadar","Daulatpur","Khalishpur","Sonadanga","Kotwali",
    "Phultala","Dacope","Batiaghata","Terokhada","Rupsha"
  ],

  "Kishoreganj": [
    "Kishoreganj Sadar","Bajitpur","Bhairab","Hossainpur","Itna",
    "Karimganj","Katiadi","Kuliarchar","Mithamain","Nikli",
    "Pakundia","Tarail","Austagram"
  ],

  "Kurigram": [
    "Kurigram Sadar","Nageshwari","Bhurungamari","Phulbari","Rajarhat",
    "Ulipur","Chilmari","Rowmari","Char Rajibpur"
  ],

  "Kushtia": [
    "Kushtia Sadar","Bheramara","Daulatpur","Kumarkhali","Mirpur","Khoksa"
  ],

  "Lakshmipur": [
    "Lakshmipur Sadar","Raipur","Ramganj","Ramgati","Komol Nagar"
  ],

  "Lalmonirhat": [
    "Lalmonirhat Sadar","Aditmari","Hatibandha","Kaliganj","Patgram"
  ],

  "Madaripur": [
    "Madaripur Sadar","Kalkini","Rajoir","Shibchar"
  ],

  "Magura": [
    "Magura Sadar","Sreepur","Mohammadpur","Shalikha"
  ],

  "Manikganj": [
    "Manikganj Sadar","Singair","Saturia","Ghior","Harirampur",
    "Shibalaya","Daulatpur"
  ],

  "Meherpur": [
    "Meherpur Sadar","Gangni","Mujibnagar"
  ],

  "Moulvibazar": [
    "Moulvibazar Sadar","Srimangal","Kamalganj","Kulaura","Rajnagar",
    "Juri","Barlekha"
  ],

  "Munshiganj": [
    "Munshiganj Sadar","Sreenagar","Sirajdikhan","Tongibari",
    "Lohajang","Gazaria"
  ],

  "Mymensingh": [
    "Mymensingh Sadar","Bhaluka","Trishal","Muktagacha","Phulpur",
    "Gouripur","Haluaghat","Ishwarganj","Nandail","Dhobaura",
    "Tarakanda"
  ],

  "Naogaon": [
    "Naogaon Sadar","Atrai","Badalgachhi","Manda","Patnitala",
    "Porsha","Raninagar","Sapahar","Dhamoirhat"
  ],

  "Narail": [
    "Narail Sadar","Kalia","Lohagara"
  ],

  "Narayanganj": [
    "Narayanganj Sadar","Bandar","Rupganj","Sonargaon","Araihazar"
  ],

  "Narsingdi": [
    "Narsingdi Sadar","Belabo","Monohardi","Palash","Raipura","Shibpur"
  ],

  "Natore": [
    "Natore Sadar","Gurudaspur","Lalpur","Singra","Baraigram","Bagatipara"
  ],

  "Netrakona": [
    "Netrakona Sadar","Atpara","Barhatta","Durgapur","Khaliajuri",
    "Kalmakanda","Kendua","Madan","Mohanganj","Purbadhala"
  ],

  "Nilphamari": [
    "Nilphamari Sadar","Saidpur","Dimla","Domar","Jaldhaka","Kishoreganj"
  ],

  "Noakhali": [
    "Noakhali Sadar","Begumganj","Chatkhil","Companiganj","Hatiya",
    "Senbagh","Subarnachar","Kabirhat"
  ],

  "Pabna": [
    "Pabna Sadar","Bera","Bhangura","Chatmohar","Faridpur",
    "Ishwardi","Santhia","Sujanagar"
  ],

  "Panchagarh": [
    "Panchagarh Sadar","Debiganj","Tetulia","Boda","Atwari"
  ],

  "Patuakhali": [
    "Patuakhali Sadar","Bauphal","Dashmina","Galachipa",
    "Kalapara","Mirzaganj","Dumki","Rangabali"
  ],

  "Pirojpur": [
    "Pirojpur Sadar","Bhandaria","Kawkhali","Mathbaria",
    "Nazirpur","Nesarabad"
  ],

  "Rajbari": [
    "Rajbari Sadar","Baliakandi","Pangsha","Kalukhali","Goalanda"
  ],

  "Rajshahi": [
    "Rajshahi Sadar","Bagha","Bagmara","Charghat","Durgapur",
    "Godagari","Mohanpur","Paba","Puthia","Tanore"
  ],

  "Rangamati": [
    "Rangamati Sadar","Barkal","Kaptai","Juraichhari","Rajasthali",
    "Langadu","Belaichhari","Nanniarchar","Kaukhali"
  ],

  "Rangpur": [
    "Rangpur Sadar","Badarganj","Gangachara","Kaunia","Mithapukur",
    "Pirgachha","Pirganj","Taraganj"
  ],

  "Satkhira": [
    "Satkhira Sadar","Assasuni","Debhata","Kalaroa","Kaliganj",
    "Tala","Shyamnagar"
  ],

  "Shariatpur": [
    "Shariatpur Sadar","Naria","Jajira","Damudya",
    "Bhedarganj","Gosairhat"
  ],

  "Sherpur": [
    "Sherpur Sadar","Nalitabari","Jhenaigati",
    "Sreebardi","Nakla"
  ],

  "Sirajganj": [
    "Sirajganj Sadar","Belkuchi","Chauhali",
    "Kamarkhanda","Kazipur","Raiganj","Shahjadpur","Tarash","Ullapara"
  ],

  "Sunamganj": [
    "Sunamganj Sadar","Bishwamvarpur","Chhatak",
    "Derai","Dharampasha","Dowarabazar","Jagannathpur",
    "Jamalganj","Sullah","Tahirpur","Shantiganj"
  ],

  "Sylhet": [
    "Sylhet Sadar","Beanibazar","Bishwanath","Companiganj","Dakshin Surma",
    "Fenchuganj","Golapganj","Gowainghat","Jaintiapur",
    "Kanaighat","Zakiganj","Osmani Nagar"
  ],

  "Tangail": [
    "Tangail Sadar","Basail","Bhuapur","Delduar","Dhanbari",
    "Ghatail","Gopalpur","Kalihati","Madhupur","Mirzapur",
    "Nagarpur","Sakhipur"
  ],

  "Thakurgaon": [
    "Thakurgaon Sadar","Baliadangi","Haripur","Pirganj","Ranisankail"
  ]
};



// Zod Schema
const shippingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  district: z.string().min(1, "Select district"),
  thana: z.string().min(1, "Select thana"),
});

export default function ShippingForm({setShippingForm}) {
  const [thanas, setThanas] = useState([]);
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      district: "",
      thana: "",
    },
  });

  // Auto-load thanas
  const handleDistrictChange = (value) => {
    setThanas(data[value] || []);
    form.setValue("district", value);
    form.setValue("thana", "");
  };

  async function onSubmit(values) {
    try {
      
      // const res = await fetch("/api/shipping", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
        
      // });
      
      console.log("Submitted:", values);
     setShippingForm(values);
    // Fake success
    form.reset();
    setThanas([]);
 // Go to cart step 3
    router.push("/cart?step=3");
      // if (!res.ok) throw new Error("Failed to submit");

     
      
       

     
    } catch (err) {
      console.log("Something went wrong.");
    router.push("/cart?step=3");
    }
  }

  return (
    <div className="w-full mx-auto ">
      <h2 className="text-2xl font-semibold mb-4">Shipping Form</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Full address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
<div className="flex justify-between w-full pb-20">

          {/* District */}
          <FormField className ="w-1/2"
            control={form.control}
            name="district"
            render={() => (
              <FormItem >
                <FormLabel>District</FormLabel>
                <Select  onValueChange={handleDistrictChange}>
                  <FormControl >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-gray-300 ' >
                    {Object.keys(data).map((d) => (
                      <SelectItem className=' hover:bg-green-400' key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thana */}
          <FormField className ="w-1/2"
            control={form.control}
            name="thana"
            render={() => (
              <FormItem>
                <FormLabel>Thana / Police Station</FormLabel>
                <Select onValueChange={(v) => form.setValue("thana", v)} disabled={thanas.length === 0}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select thana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-gray-300 '>
                    {thanas.map((t) => (
                      <SelectItem className=' hover:bg-green-400' key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
</div>

          <Button type="submit" className="w-full bg-red-500 text-white text-md font-bold py-5 hover:bg-green-500">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

