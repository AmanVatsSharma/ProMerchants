"use client"
import BackorderManager from "@/components/ProUi/BackorderManager";
import BreadcrumbNav from "@/components/ProUi/BreadcrumbNav";
import BulkProductUploader from "@/components/ProUi/BulkProductUploader";
import Carousel from "@/components/ProUi/Carousel";
import ColorPicker from "@/components/ProUi/ColorPicker";
import ConversionRateDisplay from "@/components/ProUi/ConversionRateDisplay";
import CurrencySelector from "@/components/ProUi/CurrencySelector";
import CustomerChurnRateDisplay from "@/components/ProUi/CustomerChurnRateDisplay";
import CustomerFeedbackForm from "@/components/ProUi/CustomerFeedbackForm";
import CustomerLifetimeValueGraph from "@/components/ProUi/CustomerLifetimeValueGraph";
import CustomerMessageCenter from "@/components/ProUi/CustomerMessageCenter";
import DatePicker from "@/components/ProUi/DatePicker";
import DropdownButton from "@/components/ProUi/DropdownButton";
import EngagementChart from "@/components/ProUi/EngagementChart";
import FeaturedProductBadge from "@/components/ProUi/FeaturedProductBadge";
import FilterPanel from "@/components/ProUi/FilterPanel";
import Gallery from "@/components/ProUi/Gallery";
import IconButton from "@/components/ProUi/IconButton";
import InfoCard from "@/components/ProUi/InfoCard";
import InputField from "@/components/ProUi/InputField";
import InventoryTracker from "@/components/ProUi/InventoryTracker";
import LoadingButton from "@/components/ProUi/LoadingButton";
import LogoBadge from "@/components/ProUi/LogoBadge";
import LowStockAlert from "@/components/ProUi/LowStockAlert";
import MegaMenu from "@/components/ProUi/MegaMenu";
import MetricDisplay from "@/components/ProUi/MetricDisplay";
import NavigationLink from "@/components/ProUi/NavigationLink";
import NotificationBell from "@/components/ProUi/NotificationBell";
import OrderHistoryTable from "@/components/ProUi/OrderHistoryTable";
import OrderSummaryCard from "@/components/ProUi/OrderSummaryCard";
import PriceAdjuster from "@/components/ProUi/PriceAdjuster";
import PriceTag from "@/components/ProUi/PriceTag";
import ProAccordion from "@/components/ProUi/ProAccordion";
import ProButton from "@/components/ProUi/ProButton";
import ProCheckbox from "@/components/ProUi/ProCheckbox";
import ProChipInput from "@/components/ProUi/ProChipInput";
import ProDivider from "@/components/ProUi/ProDivider";
import ProductCategoriesManager from "@/components/ProUi/ProductCategoriesManager";
import ProductDiscountManager from "@/components/ProUi/ProductDiscountManager";
import ProductImageUploader from "@/components/ProUi/ProductImageUploader";
import ProductManager from "@/components/ProUi/ProductManager";
import ProductRatingWidget from "@/components/ProUi/ProductRatingWidget";
import ProductReviewManager from "@/components/ProUi/ProductReviewManager";
import ProductStatusToggler from "@/components/ProUi/ProductStatusToggler";
import ProductTagsInput from "@/components/ProUi/ProductTagsInput";
import ProductVariantEditor from "@/components/ProUi/ProductVariantEditor";
import ProductVisibilityToggle from "@/components/ProUi/ProductVisibilityToggle";
import ProfileCard from "@/components/ProUi/ProfileCard";
import ProFileUploader from "@/components/ProUi/ProFileUploader";
import ProfitMarginCalculator from "@/components/ProUi/ProfitMarginCalculator";
import ProProgressBar from "@/components/ProUi/ProgressBar";
import ProPagination from "@/components/ProUi/ProPagination";
import ProSearchBar from "@/components/ProUi/ProSearchBar";
import ProToast from "@/components/ProUi/ProToast";
import ProToolTip from "@/components/ProUi/ProToolTip";
import QuantitySelector from "@/components/ProUi/QuantitySelector";
import RadioButton from "@/components/ProUi/RadioButton";
import RangeSlider from "@/components/ProUi/RangeSlider";
import RatingStars from "@/components/ProUi/RatingStars";
import RealTimeSalesMonitor from "@/components/ProUi/RealTimeSalesMonitor";
import SearchInput from "@/components/ProUi/SearchInput";
import SectionHeader from "@/components/ProUi/SectionHeader";
import SEOSettingsForm from "@/components/ProUi/SEOSettingsForm";
import SizePicker from "@/components/ProUi/SizePicker";
import ProSkeletonLoader from "@/components/ProUi/SkeletonLoader";
import SKUGenerator from "@/components/ProUi/SKUGenerator";
import SortDropdown from "@/components/ProUi/SortDropdown";
import StatusIndicator from "@/components/ProUi/StatusIndicator";
import Stepper from "@/components/ProUi/Stepper";
import SubscriptionManager from "@/components/ProUi/SubscriptionManager";
import TabNavigation from "@/components/ProUi/TabNavigation";
import TagLabel from "@/components/ProUi/TagLabel";
import TaxCalculator from "@/components/ProUi/TaxCalculator";
import TextArea from "@/components/ProUi/TextArea";
import Timeline from "@/components/ProUi/Timeline";
import TimePicker from "@/components/ProUi/TimePicker";
import ToggleButton from "@/components/ProUi/ToggleButton";
import ToggleSwitch from "@/components/ProUi/ToggleSwitch";
import TopSellingProductList from "@/components/ProUi/TopSellingProductList";
import TrafficSourceAnalytics from "@/components/ProUi/TrafficSourceAnalytics";
import UserAvatar from "@/components/ProUi/UserAvatar";
import UserProfileDropdown from "@/components/ProUi/UserProfileDropdown";
import VideoPlayer from "@/components/ProUi/VideoPlayer";
import { Heart, Home, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { FaBox, FaDollarSign, FaInfoCircle } from "react-icons/fa";



// Sample initial data
const initialProducts = [
    {
        id: '1',
        name: 'T-Shirt',
        description: 'Cotton T-Shirt',
        price: 19.99,
        category: 'Clothing',
        sku: 'TSH001',
        inventory: 100,
        status: 'active' as const,
        isVisible: true,
        backorderAvailable: false,
        preorderAvailable: false
    }, {
        id: '2',
        name: 'Jeans',
        description: 'Denim Jeans',
        price: 49.99,
        category: 'Clothing',
        sku: 'JNS001',
        inventory: 50,
        status: 'inactive' as const,
        isVisible: false,
        backorderAvailable: true,
        backorderLimit: 10,
        preorderAvailable: false
    },
    {
        id: '3',
        name: 'Product C',
        description: 'Denim Jeans',
        price: 39.99,
        category: 'Clothing',
        sku: 'JNS001',
        inventory: 50,
        status: 'active' as const,
        isVisible: true,
        stock: 0,
        backorderAvailable: false,
        preorderAvailable: true,
        preorderReleaseDate: '2023-12-31'
    },

]

const initialCategories = [
    {
        id: '1', name: 'Clothing', parentId: null, children: [
            { id: '2', name: 'Tops', parentId: '1', children: [] },
            { id: '3', name: 'Bottoms', parentId: '1', children: [] },
        ]
    },
    { id: '4', name: 'Accessories', parentId: null, children: [] },
]


const initialReviews = [
    { id: '1', productId: '1', rating: 4, comment: 'Great product!', helpful: 5, notHelpful: 1 },
    { id: '2', productId: '2', rating: 3, comment: 'Good, but could be better.', helpful: 2, notHelpful: 0 },
]

const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder.svg?height=40&width=40'
}

const messages = [
    { id: '1', customerId: '101', customerName: 'Alice Johnson', subject: 'Order Inquiry', content: 'Hello, I have a question about my recent order...', date: '2023-06-01', isRead: false, isStarred: false },
    { id: '2', customerId: '102', customerName: 'Bob Smith', subject: 'Product Availability', content: 'When will the XYZ product be back in stock?', date: '2023-06-02', isRead: true, isStarred: true },
    // Add more messages as needed
]

const orders = [
    { id: 'ORD001', customerName: 'Alice Johnson', date: '2023-06-01', total: 99.99, status: 'Shipped', items: [{ name: 'Product A', quantity: 2, price: 49.99 }] },
    { id: 'ORD002', customerName: 'Bob Smith', date: '2023-06-02', total: 149.99, status: 'Pending', items: [{ name: 'Product B', quantity: 1, price: 149.99 }] },
    // Add more orders as needed
]

const subscriptions = [
    { id: 'SUB001', name: 'Premium Plan', price: 29.99, billingCycle: 'Monthly', status: 'Active', nextBillingDate: '2023-07-01', customerId: '101', customerName: 'Alice Johnson' },
    { id: 'SUB002', name: 'Basic Plan', price: 9.99, billingCycle: 'Monthly', status: 'Paused', nextBillingDate: '2023-07-15', customerId: '102', customerName: 'Bob Smith' },
    // Add more subscriptions as needed
]

const conversionRateData = {
    productId: 'PROD001',
    conversionRate: 0.15,
    previousRate: 0.12,
    timeFrame: 'Last 30 days'
}

const trafficSourcesData = {
    trafficSources: [
        { source: 'Organic Search', visits: 5000, color: '#FF6384' },
        { source: 'Direct', visits: 3000, color: '#36A2EB' },
        { source: 'Social Media', visits: 2000, color: '#FFCE56' },
        { source: 'Referral', visits: 1000, color: '#4BC0C0' },
    ],
    totalVisits: 11000
}

const productsData = [
    { id: 'PROD001', name: 'Premium Widget', costPrice: 50, sellingPrice: 100 },
    { id: 'PROD002', name: 'Deluxe Gadget', costPrice: 75, sellingPrice: 150 },
    { id: 'PROD003', name: 'Super Gizmo', costPrice: 25, sellingPrice: 60 },
]

const customerLifetimeValueData = {
    customers: [
        { id: 'CUST001', name: 'Alice Johnson', lifetimeValue: [100, 150, 200, 250, 300], labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'] },
        { id: 'CUST002', name: 'Bob Smith', lifetimeValue: [80, 120, 180, 220, 280], labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'] },
        { id: 'CUST003', name: 'Charlie Brown', lifetimeValue: [120, 180, 240, 300, 360], labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'] },
    ]
}

const topSellingProductsData = [
    { id: 'PROD001', name: 'Premium Widget', salesCount: 1000, revenue: 100000, image: '/placeholder.svg?height=64&width=64' },
    { id: 'PROD002', name: 'Deluxe Gadget', salesCount: 800, revenue: 120000, image: '/placeholder.svg?height=64&width=64' },
    { id: 'PROD003', name: 'Super Gizmo', salesCount: 1200, revenue: 72000, image: '/placeholder.svg?height=64&width=64' },
]

const churnRateData = {
    rate: 0.05,
    previousRate: 0.06,
    totalCustomers: 10000,
    churnedCustomers: 500,
    timeFrame: 'month'
}

const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    pageViews: [1000, 1200, 1100, 1300, 1400, 1500],
    timeSpent: [5, 6, 5.5, 7, 7.5, 8],
    interactions: [50, 60, 55, 70, 75, 80],
}

const Test = () => {

    const [activeTab, setActiveTab] = useState('products')
    const [progress, setProgress] = useState(50)
    const [tags, setTags] = useState(['Electronics', 'Sale', 'New'])
    const [notificationCount, setNotificationCount] = useState(3)
    const [isToggled, setIsToggled] = useState(false)
    const [toggleOption, setToggleOption] = useState('Option 1')
    const [currentPage, setCurrentPage] = useState(1)
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [products, setProducts] = useState(initialProducts)
    const [reviews, setReviews] = useState(initialReviews)

    // Implement your API calls and state management here
    const handleAddProduct = async (product) => {
        // API call to add product
        console.log('Adding product:', product)
        return { ...product, id: Date.now().toString() }
    }

    const handleUpdateProduct = async (product) => {
        // API call to update product
        console.log('Updating product:', product)
    }

    const handleDeleteProduct = async (id) => {
        // API call to delete product
        console.log('Deleting product:', id)
    }

    const handleUploadBulkProducts = async (file) => {
        // API call to upload bulk products
        console.log('Uploading bulk products:', file)
    }

    const handleUploadProductImage = async (productId, file) => {
        // API call to upload product image
        console.log('Uploading image for product:', productId, file)
        return URL.createObjectURL(file) // Return a fake URL for demo purposes
    }

    const handleRemoveProductImage = async (productId, imageUrl) => {
        // API call to remove product image
        console.log('Removing image for product:', productId, imageUrl)
    }

    const handleUpdateInventory = async (productId, newInventory) => {
        // API call to update inventory
        console.log('Updating inventory for product:', productId, newInventory)
    }

    const handleAddCategory = async (category) => {
        // API call to add category
        console.log('Adding category:', category)
        return { ...category, id: Date.now().toString(), children: [] }
    }

    const handleUpdateCategory = async (category) => {
        // API call to update category
        console.log('Updating category:', category)
    }

    const handleDeleteCategory = async (id) => {
        // API call to delete category
        console.log('Deleting category:', id)
    }


    const handlePriceAdjustment = (adjustedProducts: any[]) => {
        setProducts(adjustedProducts)
    }

    const handleStatusToggle = (productId: string) => {
        setProducts(products.map(p =>
            p.id === productId ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
        ))
    }

    const handleApplyDiscounts = (discountedProducts: any[]) => {
        setProducts(discountedProducts)
    }

    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags)
    }

    const handleDeleteReview = (reviewId: string) => {
        setReviews(reviews.filter(r => r.id !== reviewId))
    }

    const handleUpdateHelpfulness = (reviewId: string, isHelpful: boolean) => {
        setReviews(reviews.map(r =>
            r.id === reviewId ? { ...r, [isHelpful ? 'helpful' : 'notHelpful']: r[isHelpful ? 'helpful' : 'notHelpful'] + 1 } : r
        ))
    }

    const handleToggleVisibility = (productId: string) => {
        setProducts(products.map(p =>
            p.id === productId ? { ...p, isVisible: !p.isVisible } : p
        ))
    }

    const handleUpdateBackorder = (productId: string, backorderAvailable: boolean, backorderLimit?: number) => {
        setProducts(products.map(p =>
            p.id === productId ? { ...p, backorderAvailable, backorderLimit } : p
        ))
    }

    const handleUpdatePreorder = (productId: string, preorderAvailable: boolean, releaseDate?: string) => {
        setProducts(products.map(p =>
            p.id === productId ? { ...p, preorderAvailable, preorderReleaseDate: releaseDate } : p
        ))
    }


    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }


    const handleLogout = () => {
        console.log('Logout')
    }

    const handleSettingsClick = () => {
        console.log('Settings clicked')
    }

    const handleHelpClick = () => {
        console.log('Help clicked')
    }

    const handleReplyMessage = (messageId: string, reply: string) => {
        console.log(`Reply to message ${messageId}: ${reply}`)
    }

    const handleMarkAsRead = (messageId: string) => {
        console.log(`Mark message ${messageId} as read`)
    }

    const handleToggleStar = (messageId: string) => {
        console.log(`Toggle star for message ${messageId}`)
    }

    const handleExportCSV = () => {
        console.log('Export CSV')
    }

    const handleUpdateSubscriptionStatus = (subscriptionId: string, newStatus: 'Active' | 'Paused' | 'Cancelled') => {
        console.log(`Update subscription ${subscriptionId} status to ${newStatus}`)
    }

    const handleRenewSubscription = (subscriptionId: string) => {
        console.log(`Renew subscription ${subscriptionId}`)
    }

    const handleRatingSubmit = (productId: string, rating: number) => {
        console.log(`Product ${productId} rated ${rating} stars`)
    }

    const handleFeedbackSubmit = (feedback: { type: 'positive' | 'neutral' | 'negative'; comment: string }) => {
        console.log('Feedback submitted:', feedback)
    }


    return (
        <div className="min-h-screen text-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800 flex items-center justify-center gap-2 p-6">
            <div className="p-6 rounded-md bg-gray-100">
                <div className="mb-6">
                    <LogoBadge text="ProMerchants" size="large" variant="light" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <InfoCard
                        title="Welcome to Your Dashboard"
                        content="Here you can monitor your sales, inventory, and performance metrics."
                        icon={<FaInfoCircle />}
                        variant="default"
                    />
                    <InfoCard
                        title="Low Stock Alert"
                        content="5 products are running low on stock. Click here to view and restock."
                        icon={<FaBox />}
                        variant="warning"
                    />
                    <InfoCard
                        title="Sales Milestone"
                        content="Congratulations! You've reached $10,000 in sales this month."
                        icon={<FaDollarSign />}
                        variant="success"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricDisplay
                        label="Total Sales"
                        value={15679}
                        prefix="$"
                        trend="up"
                        trendValue={12}
                    />
                    <MetricDisplay
                        label="Orders"
                        value={324}
                        trend="up"
                        trendValue={5}
                    />
                    <MetricDisplay
                        label="Average Order Value"
                        value={48}
                        prefix="$"
                        trend="down"
                        trendValue={3}
                    />
                    <MetricDisplay
                        label="Conversion Rate"
                        value={3.2}
                        suffix="%"
                        trend="neutral"
                        trendValue={0}
                    />
                </div>

                <div className="flex gap-6 my-6 p-3">
                    <StatusIndicator
                        status="success"
                        label="success"
                    />
                    <StatusIndicator
                        status="error"
                        label="error"
                    />
                    <StatusIndicator
                        status="info"
                        label="info"
                    />
                    <StatusIndicator
                        status="neutral"
                        label="neutral"
                    />
                    <StatusIndicator
                        status="warning"
                        label="warning"
                    />
                    <StatusIndicator
                        status="info"
                        label="info"
                        pulse
                        size="lg"
                    />

                </div>

                <div className="flex gap-6 p-3">
                    <RealTimeSalesMonitor />
                </div>

                <div className="p-6 space-y-6">
                    <SectionHeader
                        title="ProMerchants Dashboard"
                        subtitle="Welcome to your seller dashboard"
                        align="center"
                        underline
                        icon={<ShoppingCart className="text-green-500" />}
                    />

                    <div className="flex space-x-4">
                        <NavigationLink href="/" label="Home" icon={<Home />} />
                        <NavigationLink href="/products" label="Products" icon={<ShoppingCart />} />
                        <NavigationLink href="/profile" label="Profile" icon={<User />} />
                    </div>

                    <div className="flex items-center space-x-4">
                        <StatusIndicator status="success" label="Online" pulse />
                        <StatusIndicator status="warning" label="Low Stock" />
                        <StatusIndicator status="error" label="Payment Failed" />
                    </div>

                    <SearchInput
                        placeholder="Search products..."
                        onSearch={(query) => console.log('Searching for:', query)}
                    />

                    <div className="flex items-center space-x-4">
                        <ProButton variant="primary" leftIcon={<ShoppingCart />}>
                            Add to Cart
                        </ProButton>
                        <ProButton variant="outline" isLoading>
                            Processing
                        </ProButton>
                        <ProButton variant="ghost" size="sm">
                            Cancel
                        </ProButton>
                    </div>

                    <ToggleSwitch
                        isOn={isToggled}
                        onToggle={() => setIsToggled(!isToggled)}
                        label="Enable notifications"
                    />
                </div>

                <div className="p-6 space-y-6">
                    <ProProgressBar progress={progress} showPercentage />
                    <button onClick={() => setProgress(Math.random() * 100)}>
                        Update Progress
                    </button>

                    <div className="flex space-x-2">
                        {tags.map(tag => (
                            <TagLabel key={tag} text={tag} onRemove={() => removeTag(tag)} />
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <NotificationBell count={notificationCount} onClick={() => setNotificationCount(30)} />
                        <ProToolTip content="John Doe - Online">
                            <UserAvatar
                                src="https://firebasestorage.googleapis.com/v0/b/theaweshop.appspot.com/o/uploads%2FIMG_20240311_133600.jpg?alt=media&token=b7435cef-d66b-4184-b076-407c0a8ab6e6"
                                alt="John Doe"
                                status="online"
                            />
                        </ProToolTip>
                    </div>

                    <ProDivider text="Section Divider" />

                    <div className="flex h-20">
                        <div>Left Content</div>
                        <ProDivider orientation="vertical" text="OR" className="mx-4" />
                        <div>Right Content</div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex space-x-4">
                        <IconButton icon={<Heart />} onClick={() => console.log('Liked')} />
                        <IconButton icon={<ShoppingCart />} variant="secondary" onClick={() => console.log('Added to cart')} />
                    </div>

                    <ToggleButton
                        options={['Option 1', 'Option 2', 'Option 3']}
                        selectedOption={toggleOption}
                        onChange={setToggleOption}
                    />

                    <div className="flex space-x-4">
                        <LoadingButton loading>Processing</LoadingButton>
                        <LoadingButton>Submit</LoadingButton>
                    </div>

                    <DropdownButton
                        label="Select an option"
                        options={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                        onSelect={(value) => console.log('Selected:', value)}
                    />

                    <div className="flex space-x-4">
                        <ProfileCard
                            name="John Doe"
                            email="john@example.com"
                            phone="+1 234 567 890"
                            location="New York, USA"
                            avatar="https://firebasestorage.googleapis.com/v0/b/theaweshop.appspot.com/o/uploads%2FIMG_20240311_133600.jpg?alt=media&token=b7435cef-d66b-4184-b076-407c0a8ab6e6"
                            role="Senior Developer"
                        />

                        <OrderSummaryCard
                            orderNumber="ORD-12345"
                            date="2023-05-15"
                            items={[
                                { name: 'Product 1', quantity: 2, price: 19.99 },
                                { name: 'Product 2', quantity: 1, price: 29.99 },
                            ]}
                            total={69.97}
                            status="processing"
                        />
                    </div>

                    <ProSearchBar
                        onSearch={(query) => console.log('Searching for:', query)}
                        suggestions={['Product A', 'Product B', 'Product C']}
                    />

                    <div className="flex space-x-4">
                        <FilterPanel
                            groups={[
                                {
                                    id: 'category',
                                    name: 'Category',
                                    options: [
                                        { id: 'electronics', label: 'Electronics' },
                                        { id: 'clothing', label: 'Clothing' },
                                        { id: 'books', label: 'Books' },
                                    ],
                                },
                                {
                                    id: 'price',
                                    name: 'Price',
                                    options: [
                                        { id: 'under50', label: 'Under $50' },
                                        { id: '50to100', label: '$50 - $100' },
                                        { id: 'over100', label: 'Over $100' },
                                    ],
                                },
                            ]}
                            onFilterChange={(filters) => console.log('Filters:', filters)}
                        />

                        <SortDropdown
                            options={[
                                { value: 'price_asc', label: 'Price: Low to High' },
                                { value: 'price_desc', label: 'Price: High to Low' },
                                { value: 'name_asc', label: 'Name: A to Z' },
                                { value: 'name_desc', label: 'Name: Z to A' },
                            ]}
                            onSort={(value) => console.log('Sort by:', value)}
                        />
                    </div>

                    <ProPagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                    />
                </div>

                <div className="p-6 space-y-6">
                    <BreadcrumbNav
                        items={[{
                            label: 'Products',
                            href: '/products'
                        }, {
                            label: 'Category',
                            href: '/products/category'
                        }]}
                    />
                    <TabNavigation
                        tabs={[{
                            id: 'tab1',
                            label: 'Tab 1',
                            content: <div>Tab 1 content</div>
                        }, {
                            id: 'tab2',
                            label: 'Tab 2',
                            content: <div>Tab 2 content</div>
                        }]}
                    />
                    <MegaMenu
                        categories={[{
                            name: "Electronics",
                            items: [{
                                href: "#",
                                label: "Chargers"
                            }, {
                                href: "#",
                                label: "Speakers"
                            }]
                        }, {
                            name: "Clothing",
                            items: [{
                                href: "#",
                                label: "T-shirts"
                            }, {
                                href: "#",
                                label: "Jackets"
                            }]
                        }]}
                    />
                    <Stepper
                        steps={[{
                            label: "Processing",
                            description: "order is being processed!"
                        }, {
                            label: "Processing",
                            description: "order is being processed!"
                        }, {
                            label: "Processing",
                            description: "order is being processed!"
                        }]}
                        currentStep={2}
                    />
                    <Timeline
                        events={[{
                            title: "timeline 1",
                            description: "this is a timeline no.1",
                            date: "19th August 2024",
                            icon: <ShoppingCart />
                        }, {
                            title: "timeline 2",
                            description: "this is a timeline no.2",
                            date: "19th August 2024",
                            icon: <Heart />
                        }, {
                            title: "timeline 3",
                            description: "this is a timeline no.3",
                            date: "19th August 2024",
                            icon: <FaBox />
                        }]}
                    />
                    <ProAccordion
                        items={[{
                            title: "Is Promerchants better than Shopify?",
                            content: "Surely, it is the best."
                        }, {
                            title: "Is Promerchants better than Shopify?",
                            content: "Surely, it is the best."
                        }, {
                            title: "Is Promerchants better than Shopify?",
                            content: "Surely, it is the best."
                        }]}
                    />
                    <ProToast
                        onClose={() => { }}
                        message="this is a toast"
                        duration={6000}
                    />

                    <RatingStars
                        initialRating={2.7}
                    />

                    <PriceTag
                        price={59}
                        discountPercentage={5}
                    />

                    <QuantitySelector />

                    <ColorPicker colors={[{
                        hex: "#000000",
                        name: "Black"
                    }, {
                        hex: "#ffffff",
                        name: "White"
                    }, {
                        hex: "##e25c0e",
                        name: "Orange"
                    }]} />
                </div>

                <div className="p-6 space-y-6">

                    <Carousel
                        images={[
                            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fwebsite-banner&psig=AOvVaw1VKL9FHBOaC3-Ep1K6IUgY&ust=1726942102639000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjTl-qO0ogDFQAAAAAdAAAAABAE',
                            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F3226129-digital-marketing-banner-design-with-blue-abstract-background&psig=AOvVaw1VKL9FHBOaC3-Ep1K6IUgY&ust=1726942102639000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjTl-qO0ogDFQAAAAAdAAAAABAQ',
                            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F26705427-digital-marketing-presentation-horizontal-banner-template-design-abstract-blue-with-circle-objects-and-modern-blue-banner-design-with-dark-blue-background&psig=AOvVaw1VKL9FHBOaC3-Ep1K6IUgY&ust=1726942102639000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjTl-qO0ogDFQAAAAAdAAAAABAX'
                        ]}
                    />

                    <Gallery
                        images={[{
                            src: 'image1.jpg',
                            alt: 'Image 1',
                            width: 800,
                            height: 600
                        }]}
                    />

                    <VideoPlayer
                        src="https://youtu.be/XeLaiL9tk68"
                    />

                    <SizePicker
                        sizes={[{
                            label: 'S',
                            value: 'small'
                        }, {
                            label: 'M',
                            value: 'medium'
                        }, {
                            label: 'L',
                            value: 'large'
                        }]} onChange={(size) => console.log(size)}
                    />

                    <DatePicker
                        onChange={(date) => console.log(date)}
                    />

                    <TimePicker
                        onChange={(time) => console.log(time)}
                    />

                    <RangeSlider
                        min={0}
                        max={100}
                        onChange={(values) => console.log(values)}
                    />

                    <ToggleSwitch
                        isOn={false}
                        onToggle={() => console.log('Toggled')}
                    />

                    <ProCheckbox
                        checked={false}
                        onChange={(checked) => console.log(checked)}
                        label="Check me"
                    />

                    <RadioButton
                        checked={false}
                        onChange={(checked) => console.log(checked)}
                        label="Select me"
                    />

                </div>

                <div className="space-y-6">
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                        validate={(value) => {
                            if (!value.includes('@')) return 'Invalid email address'
                            return null
                        }}
                        required
                    />
                    <TextArea
                        label="Description"
                        name="description"
                        placeholder="Enter a description"
                        value={description}
                        onChange={setDescription}
                        minRows={3}
                        maxRows={6}
                    />
                    <ProFileUploader
                        onFileSelect={(file) => console.log('Selected file:', file)}
                        acceptedFileTypes={['image/*', 'application/pdf']}
                        maxFileSize={5 * 1024 * 1024} // 5MB
                    />
                    <ProChipInput
                        label="Tags"
                        placeholder="Add tags"
                        chips={tags}
                        onChange={setTags}
                        maxChips={5}
                    />
                    <div className="space-y-2">
                        <ProSkeletonLoader width="100%" height="2rem" />
                        <ProSkeletonLoader width="75%" height="1rem" />
                        <ProSkeletonLoader width="50%" height="1rem" />
                    </div>

                    <SEOSettingsForm
                        onSave={(values) => console.log(values)}
                        initialSettings={
                            {
                                title: "string",
                                description: "string",
                                keywords: ["string", "string"],
                                canonicalUrl: "string",
                                robotsTxt: "string",
                                structuredData: "string",
                            }
                        }
                    />

                    <CurrencySelector
                        onCurrencyChange={() => { }}
                        availableCurrencies={[{
                            code: "inr",
                            name: "Rupees",
                            symbol: "₹"
                        }, {
                            code: "Dlr",
                            name: "Dollars",
                            symbol: "$"
                        }]}
                        selectedCurrency={
                            {
                                code: "inr",
                                name: "Rupees",
                                symbol: "₹"
                            }}
                    />

                </div>

                <div className="container mx-auto p-6 text-black">
                    <h1 className="text-3xl font-bold mb-6">Product Management System</h1>

                    <div className="mb-6">
                        <nav className="flex space-x-4">
                            {['products', 'variants', 'bulk-upload', 'images', 'inventory', 'sku', 'categories'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md ${activeTab === tab
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {activeTab === 'products' && (
                        <ProductManager
                            initialProducts={initialProducts}
                            onAddProduct={handleAddProduct}
                            onUpdateProduct={handleUpdateProduct}
                            onDeleteProduct={handleDeleteProduct}
                        />
                    )}

                    {activeTab === 'variants' && (
                        <ProductVariantEditor
                            productId="1"
                            initialVariants={[
                                { id: '1', name: 'Color', options: ['Red', 'Blue', 'Green'] },
                                { id: '2', name: 'Size', options: ['S', 'M', 'L'] },
                            ]}
                            initialProductVariants={[
                                { id: '1', combination: { '1': 'Red', '2': 'S' }, price: 19.99, inventory: 10, sku: 'TSH001-RED-S' },
                                { id: '2', combination: { '1': 'Red', '2': 'M' }, price: 19.99, inventory: 15, sku: 'TSH001-RED-M' },
                            ]}
                            onSave={async (variants, productVariants) => {
                                console.log('Saving variants:', variants, productVariants)
                            }}
                        />
                    )}

                    {activeTab === 'bulk-upload' && (
                        <BulkProductUploader onUpload={handleUploadBulkProducts} />
                    )}

                    {activeTab === 'images' && (
                        <ProductImageUploader
                            productId="1"
                            initialImages={[]}
                            onUpload={handleUploadProductImage}
                            onRemove={handleRemoveProductImage}
                        />
                    )}

                    {activeTab === 'inventory' && (
                        <InventoryTracker
                            products={initialProducts.map(p => ({ ...p, lowStockThreshold: 10 }))}
                            onUpdateInventory={handleUpdateInventory}
                        />
                    )}

                    {activeTab === 'sku' && (
                        <SKUGenerator onGenerate={(sku) => console.log('Generated SKU:', sku)} />
                    )}

                    {activeTab === 'categories' && (
                        <ProductCategoriesManager
                            initialCategories={initialCategories}
                            onAddCategory={handleAddCategory}
                            onUpdateCategory={handleUpdateCategory}
                            onDeleteCategory={handleDeleteCategory}
                        />
                    )}
                </div>

                <div className="min-h-screen bg-gray-100 p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">ProMerchants Seller Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PriceAdjuster products={products} onAdjustPrices={handlePriceAdjustment} />
                        <ProductStatusToggler products={products} onToggleStatus={handleStatusToggle} />
                        <ProductDiscountManager products={products} onApplyDiscounts={handleApplyDiscounts} />
                        <ProductTagsInput initialTags={tags} onTagsChange={handleTagsChange} />
                        <ProductReviewManager reviews={reviews} onDeleteReview={handleDeleteReview} onUpdateHelpfulness={handleUpdateHelpfulness} />
                        <ProductVisibilityToggle products={products} onToggleVisibility={handleToggleVisibility} />
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
                            {products.map(product => (
                                <div key={product.id} className="mb-2">
                                    <span className="mr-2">{product.name}:</span>
                                    <FeaturedProductBadge isFeatured={product.isVisible} />
                                </div>
                            ))}
                        </div>
                        <LowStockAlert products={products} threshold={10} />
                        <BackorderManager products={products} onUpdateBackorder={handleUpdateBackorder} />
                    </div>
                </div>

                <div className="min-h-screen bg-gray-100">
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">ProMerchants Seller Dashboard</h1>
                            <UserProfileDropdown
                                user={user}
                                onLogout={handleLogout}
                                onSettingsClick={handleSettingsClick}
                                onHelpClick={handleHelpClick}
                            />
                        </div>
                    </header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'messages' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                            >
                                Messages
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'orders' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('subscriptions')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'subscriptions' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                            >
                                Subscriptions
                            </button>
                            <button
                                onClick={() => setActiveTab('feedback')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'feedback' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                            >
                                Feedback
                            </button>
                        </div>
                        {activeTab === 'messages' && (
                            <CustomerMessageCenter
                                messages={messages}
                                onReply={handleReplyMessage}
                                onMarkAsRead={handleMarkAsRead}
                                onToggleStar={handleToggleStar}
                            />
                        )}
                        {activeTab === 'orders' && (
                            <OrderHistoryTable
                                orders={orders}
                                onExportCSV={handleExportCSV}
                            />
                        )}
                        {activeTab === 'subscriptions' && (
                            <SubscriptionManager
                                subscriptions={subscriptions}
                                onUpdateStatus={handleUpdateSubscriptionStatus}
                                onRenew={handleRenewSubscription}
                            />
                        )}
                        {activeTab === 'feedback' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProductRatingWidget
                                    productId="PROD001"
                                    initialRating={0}
                                    onRatingSubmit={handleRatingSubmit}
                                />
                                <CustomerFeedbackForm
                                    onSubmitFeedback={handleFeedbackSubmit}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="min-h-screen bg-gray-100 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">ProMerchants Analytics Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ConversionRateDisplay {...conversionRateData} />
                        <TrafficSourceAnalytics {...trafficSourcesData} />
                        <ProfitMarginCalculator products={productsData} />
                        <CustomerLifetimeValueGraph customers={customerLifetimeValueData.customers} />
                        <TopSellingProductList products={topSellingProductsData} />
                        <CustomerChurnRateDisplay churnData={churnRateData} />
                        <div className="md:col-span-2 lg:col-span-3">
                            <EngagementChart data={engagementData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test;