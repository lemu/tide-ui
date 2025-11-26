import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/fundamental/dialog";
import { Button } from "../components/fundamental/button";
import { Icon } from "../components/fundamental/icon";
import { Badge } from "../components/fundamental/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/fundamental/card";
import { Input } from "../components/fundamental/input";
import { Label } from "../components/fundamental/label";
import { Textarea } from "../components/fundamental/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/fundamental/avatar";
import { Checkbox } from "../components/fundamental/checkbox";
import { Alert, AlertDescription } from "../components/fundamental/alert";

const meta: Meta<typeof Dialog> = {
  title: "NPM • Fundamental/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dialog
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody className="grid gap-4">
          <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
            Make changes to your profile here. Click save when you're done.
          </p>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Confirmation dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      // Simulate action
      console.log("Action confirmed");
      setIsOpen(false);
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" icon="trash-2" iconPosition="left">
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
            <Alert variant="destructive">
              <AlertDescription>
                <div className="space-y-2">
                  <p className="text-body-medium-sm font-medium">
                    What will be deleted:
                  </p>
                  <ul className="text-body-sm space-y-1">
                    <li>• Your profile and account information</li>
                    <li>• All your projects and files</li>
                    <li>• Your subscription and billing history</li>
                    <li>• All collaboration access and shared content</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </DialogBody>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              icon="trash-2"
              iconPosition="left"
              onClick={handleConfirm}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// Form dialog with validation
export const FormDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      priority: "",
      assignee: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim())
        newErrors.description = "Description is required";
      if (!formData.priority) newErrors.priority = "Priority is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        console.log("Creating task:", formData);
        setIsOpen(false);
        setFormData({ title: "", description: "", priority: "", assignee: "" });
        setErrors({});
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Icon name="plus" size="sm" className="mr-2" />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <DialogBody className="grid gap-6">
            <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
              Add a new task to your project. Fill in the details below.
            </p>
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className={
                  errors.title ? "border-[var(--color-border-error-bold)]" : ""
                }
              />
              {errors.title && (
                <p className="text-caption-sm text-[var(--color-text-error-bold)]">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the task in detail"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={
                  errors.description ? "border-[var(--color-border-error-bold)]" : ""
                }
                rows={3}
              />
              {errors.description && (
                <p className="text-caption-sm text-[var(--color-text-error-bold)]">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  className={`text-body-sm h-10 w-full rounded-md border bg-[var(--color-surface-primary)] px-3 ${
                    errors.priority
                      ? "border-[var(--color-border-error-bold)]"
                      : "border-[var(--color-interaction-border-input)]"
                  }`}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                {errors.priority && (
                  <p className="text-caption-sm text-[var(--color-text-error-bold)]">
                    {errors.priority}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <select
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignee: e.target.value,
                    }))
                  }
                  className="text-body-sm h-10 w-full rounded-md border border-[var(--color-interaction-border-input)] bg-[var(--color-surface-primary)] px-3"
                >
                  <option value="">Unassigned</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                </select>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button variant="primary" onClick={handleSubmit}>
              <Icon name="plus" size="sm" className="mr-2" />
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// Alert dialog
export const AlertDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[var(--color-text-warning-bold)]">
          <Icon name="alert-circle" size="sm" className="mr-2" />
          Show Alert
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Icon
              name="alert-triangle"
              size="lg"
              className="text-[var(--color-text-warning-bold)]"
            />
            <div>
              <DialogTitle>Storage Almost Full</DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
            Your storage is 95% full. Please free up space or upgrade your plan
            to continue using all features.
          </p>
          <div className="space-y-4">
            <div className="rounded-md border border-[var(--color-border-warning-bold)] bg-[var(--color-background-warning-subtle)] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-body-sm font-medium">Storage Usage</span>
                <span className="text-body-sm">4.75 GB / 5.00 GB</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--color-background-neutral-subtlest)]">
                <div className="h-2 w-[95%] rounded-full bg-[var(--color-background-warning-subtle)]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-body-medium-sm font-medium">
                Recommended actions:
              </h4>
              <ul className="text-body-sm space-y-1 text-[var(--color-text-secondary)]">
                <li>• Delete unnecessary files and folders</li>
                <li>• Empty your trash to permanently remove deleted items</li>
                <li>• Archive old projects to external storage</li>
                <li>• Upgrade to a higher storage plan</li>
              </ul>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button>Remind Me Later</Button>
          </DialogClose>
          <Button variant="primary">
            <Icon name="zap" size="sm" className="mr-2" />
            Upgrade Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Complex content dialog
export const ComplexContentDialog: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        status: "online",
        lastActive: "Active now",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Editor",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b787?w=32&h=32&fit=crop&crop=face",
        status: "away",
        lastActive: "5 minutes ago",
      },
      {
        id: "3",
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "Viewer",
        avatar: "",
        status: "offline",
        lastActive: "2 hours ago",
      },
    ];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Icon name="users" size="sm" className="mr-2" />
            Manage Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Team Members</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
              Manage your team members, their roles, and permissions.
            </p>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-medium">
                  {users.length} members
                </span>
                <Badge>
                  {users.filter((u) => u.status === "online").length} online
                </Badge>
              </div>
              <Button size="sm">
                <Icon name="user-plus" size="sm" className="mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className={`cursor-pointer transition-colors ${
                    selectedUser === user.id
                      ? "bg-[var(--color-background-blue-subtle-selected)]"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedUser(selectedUser === user.id ? null : user.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white ${
                              user.status === "online"
                                ? "bg-green-400"
                                : user.status === "away"
                                  ? "bg-yellow-400"
                                  : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            <Badge appearance="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                          <div className="text-body-sm flex items-center gap-4 text-[var(--color-text-secondary)]">
                            <span>{user.email}</span>
                            <span>•</span>
                            <span>{user.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Icon name="more-horizontal" className="h-4 w-4" />
                      </Button>
                    </div>

                    {selectedUser === user.id && (
                      <div className="mt-4 border-t border-[var(--color-border-primary-subtle)] pt-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-semibold">24</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Projects
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">156</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Tasks
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">8.5h</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Today
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="ghost" className="flex-1">
                            <Icon name="mail" size="sm" className="mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="ghost" className="flex-1">
                            <Icon name="settings" size="sm" className="mr-2" />
                            Settings
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};



// Multiple dialogs
export const MultipleDialogs: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    return (
      <>
        <Dialog open={firstOpen} onOpenChange={setFirstOpen}>
          <DialogTrigger asChild>
            <Button>Open Settings</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Application Settings</DialogTitle>
            </DialogHeader>
            <DialogBody className="space-y-4">
              <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
                Configure your application preferences and settings.
              </p>
              <div className="space-y-2">
                <Label>Theme</Label>
                <select className="text-body-sm h-10 w-full rounded-md border border-[var(--color-interaction-border-input)] bg-[var(--color-surface-primary)] px-3">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <select className="text-body-sm h-10 w-full rounded-md border border-[var(--color-interaction-border-input)] bg-[var(--color-surface-primary)] px-3">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </DialogBody>
            <DialogFooter className="gap-2">
              <Dialog open={secondOpen} onOpenChange={setSecondOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost">Advanced Settings</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Advanced Settings</DialogTitle>
                  </DialogHeader>
                  <DialogBody className="space-y-4">
                    <p className="text-body-md mb-4 text-[var(--color-text-secondary)]">
                      Configure advanced options and developer settings.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Debug Mode</Label>
                        <p className="text-caption-sm text-[var(--color-text-secondary)]">
                          Enable detailed logging
                        </p>
                      </div>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Experimental Features</Label>
                        <p className="text-caption-sm text-[var(--color-text-secondary)]">
                          Try new features early
                        </p>
                      </div>
                      <Checkbox />
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="primary">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="primary">Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
