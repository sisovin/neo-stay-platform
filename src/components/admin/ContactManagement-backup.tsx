import React, { useMemo, useState } from "react";
import type { ContactManagement } from "@/types/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Users,
  AlertCircle,
  RefreshCw,
  X,
  Save,
  UserCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const initialData: ContactManagement[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    message: "Hi there! I'm planning a trip to Night City and I'm interested in booking the Neo Tokyo Suites. Could you please provide more information about the amenities and availability for next month? Also, do you offer any packages for extended stays?",
    status: "new",
    createdAt: new Date('2024-08-10T09:30:00'),
    updatedAt: new Date('2024-08-10T09:30:00')
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@company.com",
    phone: "+1 (555) 234-5678",
    message: "I had an excellent stay at Orbital Heights last week. However, I noticed that my invoice shows an incorrect charge for room service. Could someone please review my billing and help resolve this issue? My booking reference is ORB-2024-001.",
    status: "in_progress",
    assignedTo: "admin-001",
    createdAt: new Date('2024-08-09T14:15:00'),
    updatedAt: new Date('2024-08-09T16:45:00')
  },
  {
    id: "3",
    name: "Luna Rodriguez",
    email: "luna.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    message: "Thank you for the amazing experience at your platform! The booking process was seamless and the customer service was outstanding. I just wanted to share my positive feedback and ask about your loyalty program. Are there any benefits for frequent guests?",
    status: "resolved",
    assignedTo: "admin-002",
    createdAt: new Date('2024-08-08T11:20:00'),
    updatedAt: new Date('2024-08-08T15:30:00')
  },
  {
    id: "4",
    name: "Alex Kim",
    email: "alex.kim@startup.io",
    phone: "+1 (555) 456-7890",
    message: "I'm organizing a corporate event for 50 people and need accommodation recommendations. We're looking for properties that can handle group bookings with meeting facilities. Could you please provide pricing and availability for the first week of September?",
    status: "new",
    createdAt: new Date('2024-08-07T16:45:00'),
    updatedAt: new Date('2024-08-07T16:45:00')
  },
  {
    id: "5",
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    phone: "+1 (555) 567-8901",
    message: "I had to cancel my booking due to a family emergency. The cancellation was processed, but I haven't received my refund yet. It's been over a week. Could you please check the status and let me know when I can expect the refund?",
    status: "in_progress",
    assignedTo: "admin-001",
    createdAt: new Date('2024-08-06T10:00:00'),
    updatedAt: new Date('2024-08-07T09:15:00')
  },
  {
    id: "6",
    name: "David Park",
    email: "david.park@email.com",
    phone: "+1 (555) 678-9012",
    message: "Great service overall! I stayed at Chrome Palace and was impressed with the facilities. Just a small suggestion - it would be nice to have more vegetarian options in the room service menu. Keep up the excellent work!",
    status: "closed",
    assignedTo: "admin-003",
    createdAt: new Date('2024-08-05T13:30:00'),
    updatedAt: new Date('2024-08-05T17:20:00')
  }
];

// Mock admin users for assignment
const adminUsers = [
  { id: "admin-001", name: "John Smith" },
  { id: "admin-002", name: "Jane Doe" },
  { id: "admin-003", name: "Mike Wilson" }
];

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState<ContactManagement[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactManagement | null>(null);
  const [compactView, setCompactView] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = searchTerm === "" || 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || contact.status === statusFilter;

      const matchesAssignee = assigneeFilter === "all" ||
        (assigneeFilter === "unassigned" && !contact.assignedTo) ||
        contact.assignedTo === assigneeFilter;

      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [contacts, searchTerm, statusFilter, assigneeFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = contacts.length;
    const newContacts = contacts.filter(c => c.status === "new").length;
    const inProgress = contacts.filter(c => c.status === "in_progress").length;
    const resolved = contacts.filter(c => c.status === "resolved").length;
    const unassigned = contacts.filter(c => !c.assignedTo).length;
    
    return { total, newContacts, inProgress, resolved, unassigned };
  }, [contacts]);

  const viewContact = (contact: ContactManagement) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  };

  const updateContactStatus = (id: string, status: ContactManagement['status']) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status, updatedAt: new Date() } : c
      )
    );
  };

  const assignContact = (id: string, adminId: string) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, assignedTo: adminId, updatedAt: new Date() } : c
      )
    );
  };

  const getStatusColor = (status: ContactManagement['status']) => {
    switch (status) {
      case "new": return "border-blue-500 text-blue-400";
      case "in_progress": return "border-yellow-500 text-yellow-400";
      case "resolved": return "border-green-500 text-green-400";
      case "closed": return "border-gray-500 text-gray-400";
      default: return "border-zinc-500 text-zinc-400";
    }
  };

  const getStatusIcon = (status: ContactManagement['status']) => {
    switch (status) {
      case "new": return <AlertCircle className="h-3 w-3" />;
      case "in_progress": return <Clock className="h-3 w-3" />;
      case "resolved": return <CheckCircle className="h-3 w-3" />;
      case "closed": return <XCircle className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setAssigneeFilter("all");
  };

  const getAdminName = (adminId: string) => {
    const admin = adminUsers.find(a => a.id === adminId);
    return admin ? admin.name : "Unknown";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(date);
  };

  return (
    <div className="bg-black/95 text-white min-h-screen rounded-lg p-4 md:p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Contact Management
            </h1>
            <p className="text-zinc-400 text-sm">
              Manage customer inquiries and support requests from the website contact form.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setCompactView(v => !v)}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {compactView ? "Comfort View" : "Compact View"}
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Total Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
              <p className="text-xs text-zinc-500">All inquiries</p>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                New Messages
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{stats.newContacts}</div>
              <p className="text-xs text-zinc-500">Require attention</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                In Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{stats.inProgress}</div>
              <p className="text-xs text-zinc-500">Being handled</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Resolved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.resolved}</div>
              <p className="text-xs text-zinc-500">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Unassigned
              </CardTitle>
              <Users className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{stats.unassigned}</div>
              <p className="text-xs text-zinc-500">Need assignment</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Search Messages</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search by name, email, message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-zinc-300">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Assigned To</Label>
                <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {adminUsers.map(admin => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Actions</Label>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Contact Messages ({filteredContacts.length})
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Manage customer inquiries and support requests
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="min-w-[200px] text-zinc-400">Customer</TableHead>
                  <TableHead className="min-w-[300px] text-zinc-400">Message</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Assigned To</TableHead>
                  <TableHead className="text-zinc-400">Received</TableHead>
                  <TableHead className="text-right text-zinc-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="border-zinc-800 hover:bg-zinc-800/30">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium leading-none">
                          {contact.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                        {!compactView && (
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className="align-top">
                      <div className="space-y-1">
                        <div className="text-zinc-300 text-sm line-clamp-2 max-w-md">
                          {contact.message}
                        </div>
                        {!compactView && (
                          <div className="text-xs text-zinc-500">
                            {contact.message.length} characters
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="align-top">
                      <Badge variant="outline" className={getStatusColor(contact.status)}>
                        {getStatusIcon(contact.status)}
                        <span className="ml-1 capitalize">{contact.status.replace('_', ' ')}</span>
                      </Badge>
                    </TableCell>

                    <TableCell className="align-top">
                      {contact.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-3 w-3 text-green-400" />
                          <span className="text-sm text-zinc-300">
                            {getAdminName(contact.assignedTo)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-500 text-sm">Unassigned</span>
                      )}
                    </TableCell>

                    <TableCell className="align-top">
                      <div className="space-y-1">
                        <div className="text-zinc-300 text-sm">
                          {getTimeAgo(contact.createdAt)}
                        </div>
                        {!compactView && (
                          <div className="text-xs text-zinc-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(contact.createdAt)}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="align-top">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewContact(contact)}
                          className="h-8 w-8 text-zinc-300 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Select
                          value={contact.status}
                          onValueChange={(value) => updateContactStatus(contact.id, value as ContactManagement['status'])}
                        >
                          <SelectTrigger className="h-8 w-24 bg-zinc-800 border-zinc-700 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={contact.assignedTo || "unassigned"}
                          onValueChange={(value) => 
                            assignContact(contact.id, value === "unassigned" ? "" : value)
                          }
                        >
                          <SelectTrigger className="h-8 w-32 bg-zinc-800 border-zinc-700 text-xs">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            {adminUsers.map(admin => (
                              <SelectItem key={admin.id} value={admin.id}>
                                {admin.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredContacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="text-zinc-500 text-sm">
                        {searchTerm || statusFilter !== "all" || assigneeFilter !== "all"
                          ? "No messages match your current filters."
                          : "No contact messages yet."}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Message Details
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              View and manage customer inquiry
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6 py-4">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-800/50 rounded-lg">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Name</Label>
                    <div className="text-white">{selectedContact.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Email</Label>
                    <div className="text-zinc-300 text-sm">{selectedContact.email}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Phone</Label>
                    <div className="text-zinc-300 text-sm">{selectedContact.phone}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300 text-xs">Status</Label>
                    <Badge variant="outline" className={getStatusColor(selectedContact.status)}>
                      {getStatusIcon(selectedContact.status)}
                      <span className="ml-1 capitalize">{selectedContact.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Message</h3>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Assignment and Status */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Status</Label>
                    <Select
                      value={selectedContact.status}
                      onValueChange={(value) => {
                        updateContactStatus(selectedContact.id, value as ContactManagement['status']);
                        setSelectedContact(prev => prev ? { ...prev, status: value as ContactManagement['status'] } : null);
                      }}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Assign To</Label>
                    <Select
                      value={selectedContact.assignedTo || "unassigned"}
                      onValueChange={(value) => {
                        const adminId = value === "unassigned" ? "" : value;
                        assignContact(selectedContact.id, adminId);
                        setSelectedContact(prev => prev ? { ...prev, assignedTo: adminId || undefined } : null);
                      }}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select admin" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {adminUsers.map(admin => (
                          <SelectItem key={admin.id} value={admin.id}>
                            {admin.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="space-y-4">
                <h3 className="text-white font-medium">Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-800/50 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-zinc-300 text-xs">Received</Label>
                    <div className="text-zinc-300 text-sm">
                      {selectedContact.createdAt.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-zinc-300 text-xs">Last Updated</Label>
                    <div className="text-zinc-300 text-sm">
                      {selectedContact.updatedAt.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManagement;