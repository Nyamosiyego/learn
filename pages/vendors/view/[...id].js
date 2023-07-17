/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const VendorView = () => {
    const router = useRouter()
    const { id } = router.query
    const [Vendors, setVendors] = useState([])
    const [email, setEmail] = useState("");
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get("/api/vendors?id=" + id).then((response) => {
        setVendors(response.data);
        console.log(response.data);
        setEmail(response.data.email);
        console.log(response.data.email);
      });
    }, [id]);

    function addAdmin(ev) {
        ev.preventDefault();
        axios
            .post("/api/admins", { email })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
        deleteApplicant();
    }

    const deleteApplicant = () => {
        axios.delete("/api/vendors?id=" + id).then((response) => {
            router.push("/admins");
        });
    }
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-10 mb-5'>Applicant details</h1>
        {Vendors.images?.map((image) => {
            return (
              <div
                key={image}
                className="rounded-3xl overflow-hidden"
              >
                <img src={image} className="w-20 h-20" alt="image" />
              </div>
            );
        })}
        <p className='text-lg font-bold mb-1 mt-8'>Applicants name:</p>
        <p className=''>{Vendors.title}</p>
        <p className='text-lg font-bold mb-1 mt-8'>Applicants email:</p>
        <p className=''>{Vendors.email}</p>
        <p className='text-lg font-bold mb-1 mt-8'>Applicants phone:</p>
        <p className=''>254{Vendors.number}</p>
        <p className='text-lg font-bold mb-1 mt-8'>Applicants description:</p>
        <p className=''>{Vendors.description}</p>
        <p className='text-lg font-bold mb-1 mt-8'>Applicants ID:</p>
        <p className=''>{Vendors.idnum}</p>
        <p className='text-lg font-bold mb-1 mt-8'>Applicants KRA Pin:</p>
        <p className='mb-4'>{Vendors.kra}</p>
        <div className='flex gap-3 mb-5'>
            <button className='btn-primary' onClick={addAdmin}>Approve</button>
            <button className='btn-red' onClick={deleteApplicant}>Reject</button>
        </div>
    </div>
  )
}

export default VendorView