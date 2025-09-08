import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Toggle } from './ui/toggle';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Skeleton } from './ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const ComponentShowcase = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeComponent, setActiveComponent] = useState(null);
  const componentRefs = useRef({});

  const copyToClipboard = (code, componentName) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(componentName);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToComponent = (componentName) => {
    setActiveComponent(componentName);
    if (componentRefs.current[componentName]) {
      componentRefs.current[componentName].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const components = [
    {
      name: 'Accordion',
      category: 'Disclosure',
      preview: (
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match the other components.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>`
    },
    {
      name: 'Alert',
      category: 'Feedback',
      preview: (
        <div className="space-y-2">
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
      ),
      code: `import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

<Alert>
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>`
    },
    {
      name: 'Avatar',
      category: 'Data Display',
      preview: (
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      ),
      code: `import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`
    },
    {
      name: 'Badge',
      category: 'Data Display',
      preview: (
        <div className="flex gap-2 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
      code: `import { Badge } from './components/ui/badge';

<Badge>New</Badge>
<Badge variant="secondary">Beta</Badge>`
    },
    {
      name: 'Breadcrumb',
      category: 'Navigation',
      preview: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
      code: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
    },
    {
      name: 'Button',
      category: 'Actions',
      preview: (
        <div className="flex gap-2 flex-wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      ),
      code: `import { Button } from './components/ui/button';

<Button>Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>`
    },
    {
      name: 'Calendar',
      category: 'Date & Time',
      preview: (
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      ),
      code: `import { Calendar } from './components/ui/calendar';

const [date, setDate] = useState(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`
    },
    {
      name: 'Card',
      category: 'Layout',
      preview: (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Action</Button>
          </CardFooter>
        </Card>
      ),
      code: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`
    },
    {
      name: 'Checkbox',
      category: 'Forms',
      preview: (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={checkboxChecked}
            onCheckedChange={setCheckboxChecked}
          />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      ),
      code: `import { Checkbox } from './components/ui/checkbox';

<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>`
    },
    {
      name: 'Collapsible',
      category: 'Disclosure',
      preview: (
        <Collapsible className="w-full max-w-sm">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              Can I use this in my project?
              <span className="text-xs">Click to expand</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="rounded-md border px-4 py-3 text-sm">
              Yes. Free to use for personal and commercial projects. No attribution required.
            </div>
          </CollapsibleContent>
        </Collapsible>
      ),
      code: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible';

<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content here
  </CollapsibleContent>
</Collapsible>`
    },
    {
      name: 'Command',
      category: 'Forms',
      preview: (
        <Command className="rounded-lg border shadow-md max-w-sm">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
      code: `import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './components/ui/command';

<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Option 1</CommandItem>
      <CommandItem>Option 2</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`
    },
    {
      name: 'Dialog',
      category: 'Overlay',
      preview: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      code: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`
    },
    {
      name: 'Dropdown Menu',
      category: 'Navigation',
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
    },
    {
      name: 'Input',
      category: 'Forms',
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <Input placeholder="Enter text..." />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input disabled placeholder="Disabled" />
        </div>
      ),
      code: `import { Input } from './components/ui/input';

<Input placeholder="Enter text..." />
<Input type="email" placeholder="Email" />`
    },
    {
      name: 'Label',
      category: 'Forms',
      preview: (
        <div className="space-y-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
      ),
      code: `import { Label } from './components/ui/label';
import { Input } from './components/ui/input';

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`
    },
    {
      name: 'Pagination',
      category: 'Navigation',
      preview: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      code: `import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './components/ui/pagination';

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
    },
    {
      name: 'Popover',
      category: 'Overlay',
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <Input placeholder="Width" />
                <Input placeholder="Height" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ),
      code: `import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>
    Place content here
  </PopoverContent>
</Popover>`
    },
    {
      name: 'Progress',
      category: 'Feedback',
      preview: (
        <div className="w-full max-w-sm space-y-2">
          <Progress value={66} />
          <p className="text-sm text-gray-500">66% Complete</p>
        </div>
      ),
      code: `import { Progress } from './components/ui/progress';

<Progress value={66} />`
    },
    {
      name: 'Radio Group',
      category: 'Forms',
      preview: (
        <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="r3" />
            <Label htmlFor="r3">Option 3</Label>
          </div>
        </RadioGroup>
      ),
      code: `import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';

<RadioGroup>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
</RadioGroup>`
    },
    {
      name: 'Select',
      category: 'Forms',
      preview: (
        <Select>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      ),
      code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>`
    },
    {
      name: 'Separator',
      category: 'Layout',
      preview: (
        <div className="w-full max-w-sm">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Section Title</h4>
            <p className="text-sm text-gray-500">Section description</p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Another Section</h4>
            <p className="text-sm text-gray-500">Another description</p>
          </div>
        </div>
      ),
      code: `import { Separator } from './components/ui/separator';

<Separator />`
    },
    {
      name: 'Skeleton',
      category: 'Feedback',
      preview: (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-20 w-full max-w-sm" />
        </div>
      ),
      code: `import { Skeleton } from './components/ui/skeleton';

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />`
    },
    {
      name: 'Slider',
      category: 'Forms',
      preview: (
        <div className="w-full max-w-sm space-y-2">
          <Slider 
            value={sliderValue} 
            onValueChange={setSliderValue}
            max={100} 
            step={1} 
          />
          <p className="text-sm text-gray-500">Value: {sliderValue}</p>
        </div>
      ),
      code: `import { Slider } from './components/ui/slider';

<Slider defaultValue={[50]} max={100} step={1} />`
    },
    {
      name: 'Switch',
      category: 'Forms',
      preview: (
        <div className="flex items-center space-x-2">
          <Switch 
            id="airplane-mode"
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
          />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      ),
      code: `import { Switch } from './components/ui/switch';

<Switch id="airplane-mode" />
<Label htmlFor="airplane-mode">Airplane Mode</Label>`
    },
    {
      name: 'Table',
      category: 'Data Display',
      preview: (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      code: `import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
    </TableRow>
  </TableBody>
</Table>`
    },
    {
      name: 'Tabs',
      category: 'Navigation',
      preview: (
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Account settings</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Password settings</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      ),
      code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`
    },
    {
      name: 'Textarea',
      category: 'Forms',
      preview: (
        <Textarea placeholder="Type your message here..." className="w-full max-w-sm" />
      ),
      code: `import { Textarea } from './components/ui/textarea';

<Textarea placeholder="Type your message..." />`
    },
    {
      name: 'Toggle',
      category: 'Actions',
      preview: (
        <div className="flex gap-2">
          <Toggle>Toggle</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      ),
      code: `import { Toggle } from './components/ui/toggle';

<Toggle>Toggle me</Toggle>`
    },
    {
      name: 'Toggle Group',
      category: 'Actions',
      preview: (
        <ToggleGroup type="single">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      ),
      code: `import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';

<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`
    },
    {
      name: 'Tooltip',
      category: 'Overlay',
      preview: (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`
    }
  ];

  // Group components by category
  const categories = [...new Set(components.map(c => c.category))].sort();
  
  // Filter components based on search
  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-4xl flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>UI Component Showcase</SheetTitle>
          <SheetDescription>
            Browse and copy code for all available UI components
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar Navigation */}
          <div className="w-64 border-r flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                {categories.map(category => {
                  const categoryComponents = filteredComponents.filter(c => c.category === category);
                  if (categoryComponents.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{category}</h3>
                      <div className="space-y-1">
                        {categoryComponents.map(component => (
                          <Button
                            key={component.name}
                            variant={activeComponent === component.name ? "secondary" : "ghost"}
                            className="w-full justify-start text-sm"
                            onClick={() => scrollToComponent(component.name)}
                          >
                            {component.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          
          {/* Right Content Area */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8">
              {filteredComponents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No components found matching "{searchQuery}"</p>
                </div>
              ) : (
                filteredComponents.map((component) => (
                  <div 
                    key={component.name} 
                    ref={el => componentRefs.current[component.name] = el}
                    className="border rounded-lg p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{component.name}</h3>
                        <p className="text-sm text-muted-foreground">{component.category}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(component.code, component.name)}
                      >
                        {copiedCode === component.name ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg">
                      {component.preview}
                    </div>
                    
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm">{component.code}</code>
                      </pre>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ComponentShowcase;