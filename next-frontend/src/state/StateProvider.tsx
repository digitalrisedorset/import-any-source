import {CatalogSourceAttributeProvider} from "@/state/catalogSourceAttributeState";
import {MagentoAttributeProvider} from "@/state/magentoAttributeState";
import {CatalogSourceMappingProvider} from "@/state/catalogSourceMappingState";
import {FlashMessageProvider} from "@/state/flassMessageState";
import {CatalogSourceProductProvider} from "@/state/catalogSourceProductState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <CatalogSourceAttributeProvider>
            <CatalogSourceProductProvider>
                <MagentoAttributeProvider>
                    <CatalogSourceMappingProvider>
                        <FlashMessageProvider>
                            {children}
                        </FlashMessageProvider>
                    </CatalogSourceMappingProvider>
                </MagentoAttributeProvider>
            </CatalogSourceProductProvider>
        </CatalogSourceAttributeProvider>;
}