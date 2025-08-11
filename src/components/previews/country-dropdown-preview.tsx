import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CountryDropdown, useCountryData } from "@/components/ui/country-dropdown";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CountryDropdownPreview() {
  const [selectedCountry1, setSelectedCountry1] = useState<string>("US");
  const [selectedCountry2, setSelectedCountry2] = useState<string>("");
  const [selectedCountry3, setSelectedCountry3] = useState<string>("GB");
  const [selectedCountry4, setSelectedCountry4] = useState<string>("CA");
  const [selectedCountry5, setSelectedCountry5] = useState<string>("JP");
  const [selectedCountry6, setSelectedCountry6] = useState<string>("DE");

  const { getCountryByCode } = useCountryData();

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg mb-[var(--space-sm)]">Country Dropdown</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          A searchable country selector with flag icons, priority countries, and multiple display variants
        </p>
      </div>

      {/* Basic Examples */}
      <div className="grid grid-cols-1 gap-[var(--space-xlg)] md:grid-cols-2 lg:grid-cols-3">
        
        {/* Default */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Default</CardTitle>
            <CardDescription>
              Standard country dropdown with flag and search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CountryDropdown
              value={selectedCountry1}
              onValueChange={setSelectedCountry1}
              placeholder="Select your country..."
            />
            {selectedCountry1 && (
              <div className="mt-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                Selected: {getCountryByCode(selectedCountry1)?.name} ({selectedCountry1})
              </div>
            )}
          </CardContent>
        </Card>

        {/* With Country Code */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">With Country Code</CardTitle>
            <CardDescription>
              Display country codes alongside country names
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CountryDropdown
              value={selectedCountry2}
              onValueChange={setSelectedCountry2}
              showCode={true}
              placeholder="Choose country..."
            />
          </CardContent>
        </Card>

        {/* Slim Variant */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Slim Variant</CardTitle>
            <CardDescription>
              Compact flag-only display for tight spaces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-[var(--space-md)]">
              <CountryDropdown
                value={selectedCountry3}
                onValueChange={setSelectedCountry3}
                variant="slim"
                flagSize={20}
              />
              {selectedCountry3 && (
                <span className="text-body-sm">
                  {getCountryByCode(selectedCountry3)?.name}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Without Flag */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Without Flag</CardTitle>
            <CardDescription>
              Text-only country selection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CountryDropdown
              value={selectedCountry4}
              onValueChange={setSelectedCountry4}
              showFlag={false}
              showCode={true}
              placeholder="Select country..."
            />
          </CardContent>
        </Card>

        {/* Large Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Large Flags</CardTitle>
            <CardDescription>
              Larger flag icons for better visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CountryDropdown
              value={selectedCountry5}
              onValueChange={setSelectedCountry5}
              flagSize={24}
              showCode={true}
            />
          </CardContent>
        </Card>

        {/* Disabled State */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Disabled</CardTitle>
            <CardDescription>
              Disabled state with pre-selected value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CountryDropdown
              value={selectedCountry6}
              onValueChange={setSelectedCountry6}
              disabled={true}
              showCode={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Custom Priority Countries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Custom Priority Countries</CardTitle>
          <CardDescription>
            Showcase different priority country sets for specific use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            
            {/* European Focus */}
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">European Focus</h4>
              <CountryDropdown
                value=""
                onValueChange={() => {}}
                priorityCountries={["GB", "DE", "FR", "IT", "ES", "NL", "BE", "CH", "AT", "SE"]}
                placeholder="Select European country..."
              />
            </div>

            {/* Asia-Pacific Focus */}
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Asia-Pacific Focus</h4>
              <CountryDropdown
                value=""
                onValueChange={() => {}}
                priorityCountries={["JP", "CN", "KR", "AU", "NZ", "SG", "IN", "TH", "MY", "PH"]}
                placeholder="Select Asia-Pacific country..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
        
        {/* User Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">User Profile Form</CardTitle>
            <CardDescription>
              Country selection in a user profile context
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-md)]">
              <div>
                <label className="text-body-medium-sm mb-[var(--space-sm)] block">
                  Country of Residence
                </label>
                <CountryDropdown
                  value={selectedCountry1}
                  onValueChange={setSelectedCountry1}
                  placeholder="Where do you live?"
                  showCode={false}
                />
              </div>
              {selectedCountry1 && (
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Icon name="map-pin" size="sm" color="success" />
                  <span className="text-body-sm text-[var(--color-text-success)]">
                    Location confirmed: {getCountryByCode(selectedCountry1)?.name}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Shipping Address</CardTitle>
            <CardDescription>
              Country selection for e-commerce checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-md)]">
              <div>
                <label className="text-body-medium-sm mb-[var(--space-sm)] block">
                  Ship to Country
                </label>
                <CountryDropdown
                  value={selectedCountry4}
                  onValueChange={setSelectedCountry4}
                  placeholder="Select shipping destination"
                  showCode={true}
                  priorityCountries={["US", "CA", "GB", "AU", "DE", "FR"]}
                />
              </div>
              {selectedCountry4 && (
                <Badge variant="success" className="inline-flex items-center gap-[var(--space-sm)]">
                  <Icon name="truck" size="sm" />
                  Ships to {getCountryByCode(selectedCountry4)?.name}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Integration Examples</CardTitle>
          <CardDescription>
            Common integration patterns and data handling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-lg)]">
            
            {/* Multi-Country Selection Simulation */}
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Business Operations</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
                Select countries where your business operates
              </p>
              <div className="grid grid-cols-2 gap-[var(--space-md)] md:grid-cols-4">
                <div>
                  <label className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                    Headquarters
                  </label>
                  <CountryDropdown
                    value={selectedCountry1}
                    onValueChange={setSelectedCountry1}
                    variant="slim"
                    flagSize={18}
                  />
                </div>
                <div>
                  <label className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                    Primary Market
                  </label>
                  <CountryDropdown
                    value={selectedCountry5}
                    onValueChange={setSelectedCountry5}
                    variant="slim"
                    flagSize={18}
                  />
                </div>
                <div>
                  <label className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                    Manufacturing
                  </label>
                  <CountryDropdown
                    value={selectedCountry4}
                    onValueChange={setSelectedCountry4}
                    variant="slim"
                    flagSize={18}
                  />
                </div>
                <div>
                  <label className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                    R&D Center
                  </label>
                  <CountryDropdown
                    value={selectedCountry6}
                    onValueChange={setSelectedCountry6}
                    variant="slim"
                    flagSize={18}
                  />
                </div>
              </div>
            </div>

            {/* Selected Countries Summary */}
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Selected Countries</h4>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                {[selectedCountry1, selectedCountry4, selectedCountry5, selectedCountry6]
                  .filter(Boolean)
                  .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                  .map((countryCode) => {
                    const country = getCountryByCode(countryCode);
                    return country ? (
                      <Badge key={countryCode} variant="secondary" className="flex items-center gap-[var(--space-sm)]">
                        <div 
                          className="inline-block rounded-[2px] shadow-[inset_0_0_0_1px_rgba(85,95,109,0.1)] bg-cover bg-center bg-no-repeat w-4 h-4"
                          style={{
                            backgroundImage: `url(https://kapowaz.github.io/square-flags/flags/${countryCode.toLowerCase()}.svg)`
                          }}
                          role="img"
                          aria-label={`${country.name} flag`}
                        />
                        {country.name}
                      </Badge>
                    ) : null;
                  })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="search" size="sm" color="brand" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Real-time country search</li>
              <li>• Search by name or country code</li>
              <li>• Fuzzy matching support</li>
              <li>• Keyboard navigation</li>
              <li>• Priority countries section</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="settings" size="sm" color="brand" />
              Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Show/hide country flags</li>
              <li>• Adjustable flag sizes</li>
              <li>• Display country codes</li>
              <li>• Slim variant for compact UI</li>
              <li>• Custom priority countries</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="shield-check" size="sm" color="brand" />
              Data & Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• ISO 3166-1 alpha-2/alpha-3 codes</li>
              <li>• Up-to-date country data</li>
              <li>• Keyboard accessible</li>
              <li>• Screen reader support</li>
              <li>• TypeScript definitions</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Guide */}
      <Card className="border-[var(--color-border-information)]">
        <CardHeader>
          <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
            <Icon name="info" size="sm" color="information" />
            Implementation Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
            <p>
              <strong>Basic Usage:</strong> Import CountryDropdown and handle selection with onValueChange callback.
            </p>
            <p>
              <strong>Data Access:</strong> Use the useCountryData hook to access country information and lookup functions.
            </p>
            <p>
              <strong>Styling:</strong> Component uses semantic design tokens and can be styled with className prop.
            </p>
            <p>
              <strong>Performance:</strong> Country data is memoized and components are optimized for large lists.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}