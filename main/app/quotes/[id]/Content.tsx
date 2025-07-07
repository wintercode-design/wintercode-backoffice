"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuoteQuery } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const quoteQuery = new QuoteQuery();

const Content = ({ quoteId }: { quoteId: string }) => {
  const {
    data: quote,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quoteDetail", quoteId],
    queryFn: () => quoteQuery.getOne(Number(quoteId)),
    enabled: !!quoteId,
  });

  if (isLoading) return <Loading status="loading" />;
  if (isError || !quote) {
    return <div className="text-center py-12">Quote not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/quotes">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quotes
        </Link>
      </Button>
      <div className="glass-effect p-8 rounded-lg">
        <header className="mb-6 border-b border-white/20 pb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            {quote.companyName || "No Company Name"}
          </h1>
          <p className="text-lg text-purple-300">
            {quote.contactPerson || quote.email}
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-semibold">{quote.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className="font-semibold">{quote.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="font-semibold">{quote.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Has Website?</p>
            <p className="font-semibold">{quote.hasWebsite ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Website</p>
            <p className="font-semibold">{quote.website}</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Business Description
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {quote.businessDescription}
          </p>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white">Target Audience</h3>
            <p className="text-gray-300">{quote.targetAudience}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Products</h3>
            <p className="text-gray-300">{quote.products}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Goals</h3>
            <p className="text-gray-300">{quote.goals}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Other Goal</h3>
            <p className="text-gray-300">{quote.otherGoal}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Priorities</h3>
            <p className="text-gray-300">{quote.priorities}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Design Likes</h3>
            <p className="text-gray-300">{quote.designLikes}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Design Dislikes</h3>
            <p className="text-gray-300">{quote.designDislikes}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Color Preferences</h3>
            <p className="text-gray-300">{quote.colorPreferences}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Reference Websites</h3>
            <p className="text-gray-300">{quote.referenceWebsites}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Competitors</h3>
            <p className="text-gray-300">{quote.competitors}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Budget</h3>
            <p className="text-gray-300">{quote.budget}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Timeline</h3>
            <p className="text-gray-300">{quote.timeline}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-white">Additional Info</h3>
          <p className="text-gray-300">{quote.additional}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Content;
