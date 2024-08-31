import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';

import React from 'react'

const socialMediaUsers = [
  {
    username: "user001",
    accountStatus: "Active",
    followersCount: 1500,
    accountType: "Personal",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
  {
    username: "user002",
    accountStatus: "Inactive",
    followersCount: 300,
    accountType: "Business",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
  {
    username: "user003",
    accountStatus: "Active",
    followersCount: 2500,
    accountType: "Personal",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
  {
    username: "user004",
    accountStatus: "Suspended",
    followersCount: 800,
    accountType: "Business",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
  {
    username: "user005",
    accountStatus: "Active",
    followersCount: 1200,
    accountType: "Personal",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
  {
    username: "user006",
    accountStatus: "Inactive",
    followersCount: 450,
    accountType: "Business",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
  {
    username: "user007",
    accountStatus: "Active",
    followersCount: 3200,
    accountType: "Personal",
    url: "https://lh3.googleusercontent.com/a/ACg8ocItYJ5QOoCQ0afbiogJxptMR5ZEMz_QqJBIAjt0AwuWxG9xnQ=s96-c",
  },
];

const avatar = [
  {

    title: "Gulshan Kumar",
    subtitle: "student",
  }
]


const VibeBoard = () => {
  return (
    <div className="flex justify-center">
      <Table className="rounded border w-full max-w-[40%] mx-auto my-[110px]">
        <TableCaption>Top vibers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center px-[10px]">
            <WhatshotOutlinedIcon/>viber</TableHead>
            <TableHead className="text-center px-[10px]">user name</TableHead>
            <TableHead className="text-center px-[10px]">status</TableHead>
            <TableHead className="text-center px-[10px]">followers</TableHead>
            <TableHead className="text-center px-[10px]">account type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialMediaUsers.map((invoice) => (
            <TableRow key={invoice.username}>
              <TableCell className="text-center px-[10px]">
                <img
                  src={invoice.url}
                  alt="Avatar"
                  className="w-[36px] h-[36px] rounded-full mx-auto"
                />
                <p>{invoice.username}</p>
              </TableCell>
              <TableCell className="text-center font-medium px-[10px]">{invoice.username}</TableCell>
              <TableCell className="text-center px-[10px]">{invoice.accountStatus}</TableCell>
              <TableCell className="text-center px-[10px]">{invoice.followersCount}</TableCell>
              <TableCell className="text-center px-[10px]">{invoice.accountType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right px-[10px]">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

export default VibeBoard;