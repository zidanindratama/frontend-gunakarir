"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { applications } from "@/data/mock-lamaran";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { LamaranStatusBadge } from "./lamaran-status";
import { motion } from "framer-motion";

const MainProfile = () => {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const user: TUser = userData?.data;

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:px-10">
        <div className="bg-white dark:bg-neutral-900 border p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={user?.image_url} />
              <AvatarFallback className="text-xl">GN</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                {user?.username}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                {user?.email}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                <Button variant="outline" asChild>
                  <Link href="/profile/ubah">Ubah Profile</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile/ubah-password">Ubah Password</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Tabs defaultValue="lamaran">
            <TabsList className="mb-6 bg-muted dark:bg-muted/50">
              <TabsTrigger value="lamaran">Lamaran</TabsTrigger>
              <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
            </TabsList>
            <TabsContent value="lamaran">
              <div className="bg-white dark:bg-neutral-900 border p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex justify-between w-full gap-3">
                    <div className="flex gap-3">
                      <Input type="text" placeholder="Cari posisi..." />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sortir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="terlama">Terlama</SelectItem>
                        <SelectItem value="terbaru">Terbaru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  {applications.map((application, index) => {
                    return (
                      <motion.div
                        className="bg-white dark:bg-neutral-900 border p-6 rounded-2xl shadow-sm"
                        key={application.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.4,
                        }}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex-1">
                            <h2 className="text-lg md:text-xl font-semibold mb-2">
                              {application.position}
                            </h2>
                            <div className="flex flex-wrap gap-3 items-center mb-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">
                                {application.type}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Gaji: {application.salary}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Image
                                src="/main/company-logo-1.svg"
                                alt="company-logo-1"
                                width={64}
                                height={64}
                                className="rounded-md"
                              />
                              <div>
                                <h3 className="font-medium">
                                  {application.company.name}
                                </h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                  <MapPin className="w-4 h-4" />
                                  {application.company.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/3 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 flex flex-col gap-3">
                            <div>
                              <h4 className="font-semibold text-muted-foreground mb-1">
                                Status
                              </h4>
                              <LamaranStatusBadge type={application.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              29 April 2025
                            </p>
                            <Button
                              variant="outline"
                              className="w-full"
                              asChild
                            >
                              <Link href="/">Lihat Detail</Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="riwayat">
              <div className="bg-white dark:bg-neutral-900 border p-6 rounded-2xl shadow-sm text-muted-foreground">
                list riwayat
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MainProfile;
