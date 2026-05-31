export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  workingHours: string;
}

export const contactService = {
  async getContactInfo(): Promise<ContactInfo> {
    return {
      email: "concierge@moxy.com",
      phone: "+94 11 234 5678",
      address: "42 Galle Road, Colombo 03, Sri Lanka",
      workingHours: "Mon - Sun: 9:00 AM - 9:00 PM (GMT+5:30)",
    };
  }
};
